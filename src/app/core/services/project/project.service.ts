import { Injectable } from '@angular/core';
import {
  PID,
  SVGDefsModel,
  SVGNodeType,
  SVGPathNodeModel,
  SVGRootModel,
  TreeNodeModel,
  TreeNodeStyleModel,
  VectorModel,
} from '@libs';
import { EventManager } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private project: SVGRootModel = new SVGRootModel();
  private projectEvents = new EventManager();
  private selectedItem: TreeNodeModel | null = null;

  public get events() {
    return this.projectEvents;
  }

  public get defs(): SVGDefsModel | undefined {
    return this.project.children.find((item) => item._type === SVGNodeType.DEFS) as SVGDefsModel;
  }

  public get selectedItemId(): PID {
    return this.selectedItem?._id || this.project._id;
  }

  createNewProject() {
    this.project = new SVGRootModel();
    this.events.trigger('project:created', this.project);
    this.events.trigger('project:tree:updates', this.project, []);
  }

  importSVG(svgCode: string) {
    const d = document.createElement('div');
    d.innerHTML = svgCode;
    const svgNode: SVGSVGElement | null = d.querySelector('svg');
    if (svgNode) {
      this.project = SVGRootModel.importFromDom(svgNode);
      this.events.trigger('project:file:imported', this.project);
      this.events.trigger('project:tree:updates', this.project, []);
    }
  }

  exportSVG() {
    TreeNodeStyleModel.renderDebug = false;
    const res = `<?xml version="1.0" encoding="utf-8"?>\n` + this.project.render();
    TreeNodeStyleModel.renderDebug = true;
    return res;
  }

  public addChildItem(parentId: PID, type: SVGNodeType, config: { [key: string]: any } = {}) {
    const item = this.project.addChild(parentId, type, config);
    this.events.trigger('project:item-added', this.project, item);
    this.events.trigger('project:tree:updates', this.project, [item]);
    return item;
  }

  public addDefItem(type: SVGNodeType, config: { [key: string]: any } = {}) {
    let defs = this.defs!;
    if (!defs) {
      defs = this.addChildItem(this.project._id, SVGNodeType.DEFS, {})! as SVGDefsModel;
    }
    const item = this.project.addChild(defs._id, type, config);
    this.events.trigger('project:item-added', this.project, item);
    this.events.trigger('project:tree:updates', this.project, [item]);
    return item;
  }

  public removeItem(id: PID) {
    let item: TreeNodeModel | undefined | null = null;
    const removeFn = (parent: TreeNodeModel) => {
      item = parent.children.find((item) => item._id === id);
      if (item) {
        parent.children = parent.children.filter((item) => item._id !== id);
      } else if (!item) {
        parent.children.forEach((child) => removeFn(child));
      }
    };

    removeFn(this.project);

    if (item) {
      this.events.trigger('project:item-removed', this.project, item);
      this.events.trigger('project:tree:updates', this.project, [item]);
    }
  }

  public selectItem(id: PID | null) {
    if (this.selectedItem?._id === id) return;

    const item = this.project.toList().find((item) => item._id === id);
    this.selectedItem = item || null;
    this.events.trigger('project:item:selected', this.project, this.selectedItem);
  }

  public setNodeProperty(id: PID, propertyName: string, value: any) {
    const item: any = this.project.toList().find((item) => item._id === id);
    if (item) {
      item[propertyName] = value;
      this.events.trigger('project:item:updated', this.project, item, propertyName, value);
      //this.events.trigger('project:tree:updates', this.project, [item]);
    }
  }

  public setNodePropertyPathItem(id: PID, pathNodeId: PID, propertyName: string, value: any) {
    const item: any = this.project.toList().find((item) => item._id === id);
    if (item && item._type === SVGNodeType.PATH) {
      const pathNode: any = item.dArray.find((nodeItem: SVGPathNodeModel) => nodeItem.id === pathNodeId);
      if (pathNode) {
        pathNode[propertyName] = value;

        this.events.trigger('project:item-path:updated', this.project, item, pathNode, propertyName, value);
        this.events.trigger('project:item:updated', this.project, item, 'd', item.d);
        //this.events.trigger('project:tree:updates', this.project, [item]);
      }
    }
  }

  public insertPresetItems(paths: string[], resize: boolean = false, aspectRatio: boolean = true) {
    const id = this.selectedItemId;
    const items: TreeNodeModel[] = paths.map((path) => this.addChildItem(id, SVGNodeType.PATH, { d: path })!);

    if (resize) {
      const points = items.map((item) => item.getMaxPoint());
      console.log('points: ', points);
      const point = points.reduce<[number, number]>(
        (acc, point) => [acc[0] < point.x ? point.x : acc[0], acc[1] < point.y ? point.y : acc[1]],
        [0, 0],
      );
      console.log('point: ', point);

      const w = this.project.viewBox.width - this.project.viewBox.x;
      const h = this.project.viewBox.height - this.project.viewBox.y;

      const scaleX = w / (aspectRatio ? Math.max(point[0], point[1]) : point[0]);
      const scaleY = h / (aspectRatio ? Math.max(point[0], point[1]) : point[1]);

      console.log(w, h, ' | ', scaleX, scaleY);

      items.forEach((item) => item.resize(scaleX, scaleY));
    }

    items.forEach((item) => this.events.trigger('project:item-added', this.project, item));
    this.events.trigger('project:tree:updates', this.project, items);
    return items;
  }

  /**
   * Shifts the selected item by the given vector.
   * If the item is moved, an event "project:item:updated" is triggered for each changed property.
   * @param shift The vector to shift the item by.
   */
  public dragMoveSelectedItem(shift: VectorModel) {
    const item: any = this.selectedItem;
    if (item) {
      const changedProperties = item.moveShift(shift);
      changedProperties.forEach((prop: string) =>
        this.events.trigger('project:item:updated', this.project, item, prop, item[prop]),
      );
      this.events.trigger('project:item:moved', this.project, item, shift);
    }
  }

  public transformSelectedItem(action: string, transformAnchor: string[], shift: VectorModel) {
    const item: TreeNodeModel = this.selectedItem!;
    if (item) {
      /*transformAnchor.forEach((anchor: string, index: number) => {
        if (anchor) {
          item.transformShift(anchor, shift);
        }
      });*/
      let changedProperties: string[] = [];
      if (action === 'move') {
        changedProperties = item.moveShift(shift);
      } else if (action === 'transform') {
        changedProperties = item.transformShift(transformAnchor, shift);
      }

      changedProperties.forEach((prop: string) =>
        this.events.trigger('project:item:updated', this.project, item, prop, (item as any)[prop]),
      );
      this.events.trigger('project:item:transformed', this.project, item, shift);
    }
  }
}

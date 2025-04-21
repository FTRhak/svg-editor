import { Injectable } from '@angular/core';
import { PID, SVGNodeType, SVGRootModel, TreeNodeModel } from '@libs';
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

  createNewProject() {
    this.project = new SVGRootModel();
    this.events.trigger('project:created', this.project);
    this.events.trigger('project:tree:updates', this.project, []);
  }

  importSVG(svgCode: string) {
    console.log('import:', svgCode);
    const d = document.createElement('div');
    d.innerHTML = svgCode;
    const svgNode: SVGSVGElement | null = d.querySelector('svg');
    if (svgNode) {
      this.project = SVGRootModel.importFromDom(svgNode);
      this.events.trigger('project:file:imported', this.project);
      this.events.trigger('project:tree:updates', this.project, []);
    }

    //this.project = svg;
    //this.events.trigger('project:imported', this.project);
  }

  public addChildItem(parentId: PID, type: SVGNodeType, config: { [key: string]: any } = {}) {
    const item = this.project.addChild(parentId, type, config);
    this.events.trigger('project:item-added', this.project, item);
    this.events.trigger('project:tree:updates', this.project, [item]);
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
    const item = this.project.toList().find((item) => item._id === id);
    this.selectedItem = item || null;
    this.events.trigger('project:item:selected', this.project, this.selectedItem);
  }

  public setNodeProperty(id: PID, propertyName: string, value: any) {
    const item: any = this.project.toList().find((item) => item._id === id);
    if (item) {
      item[propertyName] = value;
      this.events.trigger('project:item:updated', this.project, item, propertyName, value);
      this.events.trigger('project:tree:updates', this.project, [item]);
    }
  }
}

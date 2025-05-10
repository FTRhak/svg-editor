import { SVGNodeType } from './node.type';
import { RectModel } from './rect.model';
import { StyleAttributeModel } from './style-attribute.model';
import { TreeItem } from './tree-item.model';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { VectorModel } from './vector.model';

export class TreeNodeModel {
  public readonly _type!: SVGNodeType;
  public readonly _id!: string;
  children: TreeNodeModel[] = [];

  constructor(params?: Partial<TreeNodeModel>) {}

  public toTree(): TreeItem {
    const item: TreeItem = new TreeItem(this._id, this._type);

    this.children.forEach((child) => {
      item.children.push(child.toTree());
    });
    return item;
  }

  public toList(): TreeNodeModel[] {
    const list: TreeNodeModel[] = [this];
    this.children.forEach((child) => {
      list.push(...child.toList());
    });
    return list;
  }

  public renderId(): string {
    let res = ``;
    if (TreeNodeStyleModel.renderDebug) {
      res += ` data-id="${this._id}"`;
    }
    return res;
  }

  public render(): string {
    return `<${this._type} data-id="${this._id}"/>`;
  }

  public renderSelectionMoveArea(
    fill: string,
    stroke: string,
    strokeWidth: number = 0.01,
    selectionRecSize: number = 0.1,
  ): string {
    console.warn(`Need to implement renderSelectionMoveArea for TreeNodeModel ${this._type}`);
    return `<${this._type} data-id="${this._id}"/>`;
  }

  public anchorPoints(): VectorModel[] {
    return [];
  }

  public moveShift(shift: VectorModel): string[] {
    console.warn(`Need to implement moveShift for TreeNodeModel ${this._type}`);
    return [];
  }

  public transformShift(anchor: string[], shift: VectorModel): string[] {
    console.warn(`Need to implement transformShift for TreeNodeModel ${this._type}`);
    return [];
  }

  public resize(xCoefficient: number, yCoefficient: number): string[] {
    console.warn(`Need to implement resize for TreeNodeModel ${this._type}`);
    return [];
  }

  public getMaxPoint(): VectorModel {
    console.warn(`Need to implement getMaxPoint for TreeNodeModel ${this._type}`);
    return new VectorModel(0, 0);
  }

  public getBoundingRect(): RectModel {
    console.warn(`Need to implement getBoundingRect for TreeNodeModel ${this._type}`);
    return new RectModel();
  }

  public clone(): TreeNodeModel {
    return new TreeNodeModel(this);
  }

  public static importFromDom(dom: any): TreeNodeModel {
    console.warn(`Need to implement importFromDom for TreeNodeModel`);
    return new TreeNodeModel();
  }

  public static importStyle(domStyle: CSSStyleDeclaration): StyleAttributeModel {
    const style: StyleAttributeModel = {};

    let i = 0;
    while (domStyle[i]) {
      const key = domStyle[i] as any;
      style[key] = domStyle[key];
      i++;
    }

    return style;
  }
}

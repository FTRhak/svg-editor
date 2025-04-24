import { SVGNodeType } from './node.type';
import { StyleAttributeModel } from './style-attribute.model';
import { TreeItem } from './tree-item.model';
import { VectorModel } from './vector.model';

export class TreeNodeModel {
  public readonly _type!: SVGNodeType;
  public readonly _id!: string;
  children: TreeNodeModel[] = [];

  constructor() {}

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

  public render(): string {
    return `<${this._type} id="${this._id}"/>`;
  }

  public anchorPoints(): VectorModel[] {
    return [];
  }

  public moveShift(dx: number, dy: number): string[] {
    return [];
  }

  public static importFromDom(dom: any): TreeNodeModel {
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

import { SVGNodeType } from './node.type';
import { TreeItem } from './tree-item.model';

export class TreeNodeModel {
  public readonly _type!: SVGNodeType;
  public readonly _id!: string;
  children: TreeNodeModel[] = [];

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
    return `${this._id}`;
  }
}

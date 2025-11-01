import { SVGNodeType } from './node.type';
import { RectModel } from './rect.model';
import { StyleAttributeModel } from './style-attribute.model';
import { TreeItem } from './tree-item.model';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { VectorModel } from './vector.model';

export class TreeNodeModel {
  public readonly _type!: SVGNodeType;
  public readonly _id!: string;

  public children: TreeNodeModel[] = [];
  public parent: TreeNodeModel | null = null;

  protected readonly canInsert: SVGNodeType[] = [];

  constructor(params?: Partial<TreeNodeModel>) {}

  public canInsertType(type: SVGNodeType): boolean {
    return this.canInsert.includes(type);
  }

  /**
   * Converts the tree node to a TreeItem structure, which is a flatten
   * representation of the tree, suitable for the TreeView component.
   *
   * The function traverses the tree and creates a new tree structure
   * with the same nodes and children, but with the `TreeItem` type.
   *
   * @returns The TreeItem representation of the tree.
   */
  public toTreeView(): TreeItem {
    const item: TreeItem = new TreeItem(this._id, this._type, '', this.canInsert);

    this.children.forEach((child) => {
      item.children.push(child.toTreeView());
    });
    return item;
  }

  /**
   * Converts the tree node and its descendants into a flat list.
   *
   * The function traverses the entire tree starting from this node,
   * adding each node to a list. The result is a linear representation
   * of the tree structure, including all child nodes.
   *
   * @returns An array of TreeNodeModel instances representing the
   *          entire subtree starting from this node.
   */
  public toList(): TreeNodeModel[] {
    const list: TreeNodeModel[] = [this];
    this.children.forEach((child) => {
      list.push(...child.toList());
    });
    return list;
  }

  //#region Render
  public renderId(): string {
    let res = ``;
    if (TreeNodeStyleModel.renderDebug) {
      res += ` data-id="${this._id}"`;
    }
    return res;
  }

  public render(): string {
    return `<${this._type} ` + this.renderId() + `/>`;
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
  //#endregion

  //#region Transform
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
  //#endregion

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

  public destroy(): void {
    this.children.forEach((child) => child.destroy());
    this.children = [];
    this.parent = null;
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

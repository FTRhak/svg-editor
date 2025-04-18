import { Generator } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { SVGGroupModel } from './svg-group.model';
import { SVGPathModel } from './svg-path.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGRootModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.SVG;
  public override readonly _id: PID;
  public readonly version = '1.0';
  public width!: number;
  public height!: number;
  viewBox?: string;

  public override children: SVGGroupModel[] = [];

  constructor() {
    super();
    this._id = Generator.getId('svg-');
  }

  public addChild(id: PID, type: SVGNodeType): TreeNodeModel | null {
    const list = this.toList();
    const item = list.find((item) => item._id === id);
    if (item) {
      const node = SVGRootModel.createNode(item, type);
      return node;
    }
    return null;
  }

  public static createNode(parent: TreeNodeModel, type: SVGNodeType) {
    let node: TreeNodeModel;

    switch (type) {
      case SVGNodeType.GROUP:
        node = new SVGGroupModel();
        break;
      case SVGNodeType.REFS:
        node = new SVGPathModel();
        break;
      case SVGNodeType.PATH:
        node = new SVGPathModel();
        break;
      default:
        console.warn('Unknown node type to crate');
        break;
    }

    if (node!) {
      parent.children.push(node);
    }

    return node!;
  }
}

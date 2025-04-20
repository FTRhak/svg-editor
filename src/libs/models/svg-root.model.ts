import { Generator } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { SVGCircleModel } from './svg-circle.model';
import { SVGEllipseModel } from './svg-ellipse.model';
import { SVGGroupModel } from './svg-group.model';
import { SVGPathModel } from './svg-path.model';
import { SVGRectModel } from './svg-rect.model';
import { SVGRefsModel } from './svg-refs.model';
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

  public addChild(id: PID, type: SVGNodeType, config: { [key: string]: any }): TreeNodeModel | null {
    const list = this.toList();
    const item = list.find((item) => item._id === id);
    if (item) {
      const node = SVGRootModel.createNode(item, type, config);
      return node;
    }
    return null;
  }

  public static createNode(parent: TreeNodeModel, type: SVGNodeType, config: { [key: string]: any }) {
    let node: TreeNodeModel;

    switch (type) {
      case SVGNodeType.GROUP:
        node = new SVGGroupModel();
        break;
      case SVGNodeType.REFS:
        node = new SVGRefsModel();
        break;
      case SVGNodeType.PATH:
        node = new SVGPathModel(config);
        break;
      case SVGNodeType.RECT:
        node = new SVGRectModel(config);
        break;
      case SVGNodeType.CIRCLE:
        node = new SVGCircleModel(config);
        break;
      case SVGNodeType.ELLIPSE:
        node = new SVGEllipseModel(config);
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

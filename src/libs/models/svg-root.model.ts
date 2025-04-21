import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { RectModel } from './rect.model';
import { SVGCircleModel } from './svg-circle.model';
import { SVGEllipseModel } from './svg-ellipse.model';
import { SVGGroupModel } from './svg-group.model';
import { SVGLineModel } from './svg-line.model';
import { SVGPathModel } from './svg-path.model';
import { SVGRectModel } from './svg-rect.model';
import { SVGRefsModel } from './svg-refs.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGRootModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.SVG;
  public override readonly _id: PID;
  public readonly version = '1.0';
  public width!: string;
  public height!: string;
  public x!: string;
  public y!: string;
  public baseProfile!: string;
  public preserveAspectRatio!: string;
  viewBox?: RectModel;

  public override children: TreeNodeModel[] = [];

  constructor(x: number = 0, y: number = 0, width: number = 10, height: number = 10) {
    super();
    this._id = Generator.getId('svg-');
    this.viewBox = new RectModel(x, y, width, height);
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

  public override render() {
    const vb = this.viewBox;
    let res =
      `<svg id="${this._id}" ` +
      (isNotUndefined(this.x) ? ` x="${this.x}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y}"` : '') +
      (isNotUndefined(this.width) ? ` width="${this.width}"` : '') +
      (isNotUndefined(this.height) ? ` height="${this.height}"` : '') +
      (isNotUndefined(vb) ? ` viewBox="${vb?.x} ${vb?.y} ${vb?.width} ${vb?.height}"` : '') +
      (isNotUndefined(this.version) ? ` version="${this.version}"` : '') +
      `>`;

    this.children.forEach((child) => (res += child.render()));

    res += `</svg>`;
    return res;
  }

  public static createNode(
    parent: TreeNodeModel,
    type: SVGNodeType,
    config: { [key: string]: any } = {},
  ): TreeNodeModel {
    let node: TreeNodeModel;

    switch (type) {
      case SVGNodeType.GROUP:
        node = new SVGGroupModel(config);
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
      case SVGNodeType.LINE:
        node = new SVGLineModel(config);
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

  public static override importFromDom(dom: SVGSVGElement): SVGRootModel {
    const svg = new SVGRootModel();
    svg.width = dom.width.baseVal.valueAsString;
    svg.height = dom.height.baseVal.valueAsString;
    svg.viewBox = dom.viewBox.baseVal;

    importChildren(svg, dom.children);

    return svg;
  }
}

function importChildren(parent: TreeNodeModel, collection: HTMLCollection) {
  Array.from(collection).forEach((item) => {
    switch (item.nodeName) {
      case SVGNodeType.GROUP:
        const group = SVGGroupModel.importFromDom(item as SVGGElement);
        parent.children.push(group);
        importChildren(group, item.children);
        break;
      case SVGNodeType.PATH:
        const path = SVGPathModel.importFromDom(item as SVGPathElement);
        parent.children.push(path);
        importChildren(path, item.children);
        break;
      case SVGNodeType.RECT:
        const rect = SVGRectModel.importFromDom(item as SVGRectElement);
        parent.children.push(rect);
        importChildren(rect, item.children);
        break;
    }
  });
}

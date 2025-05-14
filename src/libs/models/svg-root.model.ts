import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { RectModel } from './rect.model';
import { SVGCircleModel } from './svg-circle.model';
import { SVGDefsModel } from './svg-defs.model';
import { SVGEllipseModel } from './svg-ellipse.model';
import { SVGGroupModel } from './svg-group.model';
import { SVGLineModel } from './svg-line.model';
import { SVGLinearGradientModel } from './svg-linear-gradient.model';
import { SVGPathModel } from './svg-path.model';
import { SVGRadialGradientModel } from './svg-radial-gradient.model';
import { SVGRectModel } from './svg-rect.model';
import { SVGStopModel } from './svg-stop.model';
import { SVGTextModel } from './svg-text.model';
import { TreeNodeGradientModel } from './tree-node-gradient.model';
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
  viewBox: RectModel;

  public override children: TreeNodeModel[] = [];

  protected override readonly canInsert: SVGNodeType[] = [
    SVGNodeType.DEFS,
    SVGNodeType.GROUP,
    SVGNodeType.CIRCLE,
    SVGNodeType.ELLIPSE,
    SVGNodeType.LINE,
    SVGNodeType.PATH,
    SVGNodeType.RECT,
    SVGNodeType.TEXT,
  ];

  /**
   * Constructor
   *
   * @param x - The x coordinate of the top left of the view box
   * @param y - The y coordinate of the top left of the view box
   * @param width - The width of the view box
   * @param height - The height of the view box
   */
  constructor(x: number = 0, y: number = 0, width: number, height: number) {
    super();
    this._id = Generator.getId('svg-');
    this.width = `${width}px`;
    this.height = `${height}px`;
    this.viewBox = new RectModel(x, y, width, height);
  }

  public override render() {
    const vb = this.viewBox;
    let res =
      `<svg id="${this._id}" ` +
      (isNotUndefined(this.x) ? ` x="${this.x}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y}"` : '') +
      (isNotUndefined(this.width) ? ` width="${this.width}"` : '') +
      (isNotUndefined(this.height) ? ` height="${this.height}"` : '') +
      (isNotUndefined(vb) ? ` viewBox="${vb?.x}  ${vb?.y}  ${vb?.width}  ${vb?.height}"` : '') +
      (isNotUndefined(this.version) ? ` version="${this.version}"` : '') +
      ` xmlns="http://www.w3.org/2000/svg"` +
      `>\n`;

    this.children.forEach((child) => (res += '  ' + child.render()));

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
      case SVGNodeType.DEFS:
        node = new SVGDefsModel(config);
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
      case SVGNodeType.DEFS:
        node = new SVGDefsModel(config);
        break;
      case SVGNodeType.LINEAR_GRADIENT:
        node = new SVGLinearGradientModel(config);
        break;
      case SVGNodeType.RADIAL_GRADIENT:
        node = new SVGRadialGradientModel(config);
        break;
      case SVGNodeType.STOP:
        node = new SVGStopModel(config);
        break;
      case SVGNodeType.TEXT:
        node = new SVGTextModel(config);
        break;
      default:
        console.warn('Unknown node type to create');
        break;
    }

    if (node!) {
      parent.children.push(node);
      node.parent = parent;
    }

    return node!;
  }

  public static override importFromDom(dom: SVGSVGElement): SVGRootModel {
    const width = parseInt(dom.width.baseVal.valueAsString || '0');
    const height = parseInt(dom.height.baseVal.valueAsString || '0');
    const svg = new SVGRootModel(0, 0, width, height);
    svg.viewBox = dom.viewBox.baseVal;

    importChildren(svg, dom.children);

    return svg;
  }

  public static previewGradient(gradient: TreeNodeGradientModel, width: number = 100, height: number = 50): string {
    const root = new SVGRootModel(0, 0, width, height);
    const def = new SVGDefsModel({});
    root.children.push(def);
    const g = gradient.clone();
    g.id = 'myId';
    def.children.push(g);

    const rect = new SVGRectModel({ x: 0, y: 0, width, height, fill: 'url(#myId)' });
    root.children.push(rect);

    return root.render();
  }
}

function importChildren(parent: TreeNodeModel, collection: HTMLCollection): void {
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
      case SVGNodeType.ELLIPSE:
        const ellipse = SVGEllipseModel.importFromDom(item as SVGEllipseElement);
        parent.children.push(ellipse);
        importChildren(ellipse, item.children);
        break;
      case SVGNodeType.CIRCLE:
        const circle = SVGCircleModel.importFromDom(item as SVGCircleElement);
        parent.children.push(circle);
        importChildren(circle, item.children);
        break;
      case SVGNodeType.LINE:
        const line = SVGLineModel.importFromDom(item as SVGLineElement);
        parent.children.push(line);
        importChildren(line, item.children);
        break;
      case SVGNodeType.TEXT:
        const text = SVGTextModel.importFromDom(item as SVGTextElement);
        parent.children.push(text);
        importChildren(text, item.children);
        break;
      case SVGNodeType.DEFS:
        const defs = SVGDefsModel.importFromDom(item as SVGDefsElement);
        parent.children.push(defs);
        importChildren(defs, item.children);
        break;
      case SVGNodeType.LINEAR_GRADIENT:
        const lgr = SVGLinearGradientModel.importFromDom(item as SVGLinearGradientElement);
        parent.children.push(lgr);
        importChildren(lgr, item.children);
        break;
      case SVGNodeType.RADIAL_GRADIENT:
        const rgr = SVGRadialGradientModel.importFromDom(item as SVGRadialGradientElement);
        parent.children.push(rgr);
        importChildren(rgr, item.children);
        break;
    }
  });
}

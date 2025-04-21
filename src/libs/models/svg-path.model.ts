import { Generator, hasStyleProperties, isNotUndefined, styleToString } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { StyleAttributeModel } from './style-attribute.model';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGPathModel extends TreeNodeModel implements TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.PATH;
  public override readonly _id: PID;
  public fill!: string;
  public stroke!: string;
  public strokeWidth!: number;
  public transform!: string;
  public style!: StyleAttributeModel;
  public d!: string;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGPathModel>) {
    super();
    this._id = Generator.getId('path-');
    if (isNotUndefined(params.d)) this.d = params.d as string;
    if (isNotUndefined(params.fill)) this.fill = params.fill as string;
    if (isNotUndefined(params.stroke)) this.stroke = params.stroke as string;
    if (isNotUndefined(params.strokeWidth)) this.strokeWidth = params.strokeWidth as number;
    if (isNotUndefined(params.style)) this.style = params.style || {};
  }

  public override render() {
    let res =
      `<path id="${this._id}" ` +
      (isNotUndefined(this.fill) ? ` fill="${this.fill}"` : '') +
      (isNotUndefined(this.stroke) ? ` stroke="${this.stroke}"` : '') +
      (isNotUndefined(this.strokeWidth) ? ` stroke-width="${this.strokeWidth}"` : '') +
      (isNotUndefined(this.transform) ? ` transform="${this.transform}"` : '') +
      (hasStyleProperties(this.style) ? ` style="${styleToString(this.style)}"` : '') +
      (isNotUndefined(this.d) ? ` d="${this.d}"` : '') +
      `></path>`;
    return res;
  }

  public static override importFromDom(dom: SVGPathElement) {
    const node = new SVGPathModel({
      d: dom.getAttribute('d')!,
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
    });

    return node;
  }
}

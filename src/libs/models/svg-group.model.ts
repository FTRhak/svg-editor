import { Generator, hasStyleProperties, isNotUndefined, styleToString } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { StyleAttributeModel } from './style-attribute.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGGroupModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.GROUP;
  public override readonly _id: PID;
  public fill!: string;
  public stroke!: string;
  public strokeWidth!: number;
  public transform!: string;
  public style!: StyleAttributeModel;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGGroupModel>) {
    super();
    this._id = Generator.getId('group-');
    if (isNotUndefined(params.fill)) this.fill = params.fill as string;
    if (isNotUndefined(params.stroke)) this.stroke = params.stroke as string;
    if (isNotUndefined(params.strokeWidth)) this.strokeWidth = params.strokeWidth as number;
    if (isNotUndefined(params.style)) this.style = params.style || {};
    if (isNotUndefined(params.transform)) this.transform = params.transform as string;
  }

  public override render() {
    let res =
      `<g id="${this._id}" ` +
      (isNotUndefined(this.fill) ? ` fill="${this.fill}"` : '') +
      (isNotUndefined(this.stroke) ? ` stroke="${this.stroke}"` : '') +
      (isNotUndefined(this.strokeWidth) ? ` stroke-width="${this.strokeWidth}"` : '') +
      (isNotUndefined(this.transform) ? ` transform="${this.transform}"` : '') +
      (hasStyleProperties(this.style) ? ` style="${styleToString(this.style)}"` : '') +
      `>`;

    this.children.forEach((child) => (res += child.render()));

    res += `</g>`;
    return res;
  }

  public static override importFromDom(dom: SVGGElement) {
    const node = new SVGGroupModel({
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      transform: dom.getAttribute('transform')! || undefined,
    });

    return node;
  }
}

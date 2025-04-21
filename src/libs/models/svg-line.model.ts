import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGLineModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.LINE;
  public override readonly _id: PID;
  public x1!: number;
  public y1!: number;
  public x2!: number;
  public y2!: number;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGLineModel>) {
    super(params);
    this._id = Generator.getId('line-');
    if (isNotUndefined(params.x1)) this.x1 = params.x1 as number;
    if (isNotUndefined(params.y1)) this.y1 = params.y1 as number;
    if (isNotUndefined(params.x2)) this.x2 = params.x2 as number;
    if (isNotUndefined(params.y2)) this.y2 = params.y2 as number;
  }

  public override render() {
    let res =
      `<line ` +
      this.renderPart() +
      (isNotUndefined(this.style) ? ` style="${this.style}"` : '') +
      (isNotUndefined(this.x1) ? ` x1="${this.x1}"` : '') +
      (isNotUndefined(this.y1) ? ` y1="${this.y1}"` : '') +
      (isNotUndefined(this.x2) ? ` x2="${this.x2}"` : '') +
      (isNotUndefined(this.y2) ? ` y2="${this.y2}"` : '') +
      `></line>`;
    return res;
  }

  public static override importFromDom(dom: SVGLineElement) {
    const node = new SVGLineModel({
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      transform: dom.getAttribute('transform')! || undefined,
      x1: dom.getAttribute('x1') ? parseFloat(dom.getAttribute('x1')!) : undefined,
      y1: dom.getAttribute('y1') ? parseFloat(dom.getAttribute('y1')!) : undefined,
      x2: dom.getAttribute('x2') ? parseFloat(dom.getAttribute('x2')!) : undefined,
      y2: dom.getAttribute('y2') ? parseFloat(dom.getAttribute('y2')!) : undefined,
    });

    return node;
  }
}

import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';
import { VectorModel } from './vector.model';

export class SVGPathModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.PATH;
  public override readonly _id: PID;
  public d!: string;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGPathModel>) {
    super(params);
    this._id = Generator.getId('path-');
    if (isNotUndefined(params.d)) this.d = params.d as string;
  }

  public override render() {
    let res = `<path ` + this.renderPart() + (isNotUndefined(this.d) ? ` d="${this.d}"` : '') + `></path>\n`;
    return res;
  }

  public override moveShift(shift: VectorModel) {
    console.warn('Need to implement moveShift for SVGPathModel');
    return ['d'];
  }

  public static override importFromDom(dom: SVGPathElement) {
    const node = new SVGPathModel({
      d: dom.getAttribute('d')!,
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      transform: dom.getAttribute('transform')! || undefined,
    });

    return node;
  }
}

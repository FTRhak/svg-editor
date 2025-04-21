import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGEllipseModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.ELLIPSE;
  public override readonly _id: PID;
  public cx: number = 0;
  public cy: number = 0;
  public rx: number = 0;
  public ry: number = 0;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGEllipseModel>) {
    super(params);
    this._id = Generator.getId('ellipse-');
    if (isNotUndefined(params.cx)) this.cx = params.cx as number;
    if (isNotUndefined(params.cy)) this.cy = params.cy as number;
    if (isNotUndefined(params.rx)) this.rx = params.rx as number;
    if (isNotUndefined(params.ry)) this.ry = params.ry as number;
  }

  public override render() {
    let res =
      `<ellipse ` +
      this.renderPart() +
      (isNotUndefined(this.cx) ? ` cx="${this.cx}"` : '') +
      (isNotUndefined(this.cy) ? ` cy="${this.cy}"` : '') +
      (isNotUndefined(this.rx) ? ` rx="${this.rx}"` : '') +
      (isNotUndefined(this.ry) ? ` ry="${this.ry}"` : '') +
      `></ellipse>`;
    return res;
  }

  public static override importFromDom(dom: SVGEllipseElement) {
    const node = new SVGEllipseModel({
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      transform: dom.getAttribute('transform')! || undefined,
      cx: dom.getAttribute('cx') ? parseFloat(dom.getAttribute('cx')!) : undefined,
      cy: dom.getAttribute('cy') ? parseFloat(dom.getAttribute('cy')!) : undefined,
      rx: dom.getAttribute('rx') ? parseFloat(dom.getAttribute('rx')!) : undefined,
      ry: dom.getAttribute('ry') ? parseFloat(dom.getAttribute('ry')!) : undefined,
    });

    return node;
  }
}

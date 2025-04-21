import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';
import { VectorModel } from './vector.model';

export class SVGRectModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.RECT;
  public override readonly _id: PID;
  public x!: number;
  public y!: number;
  public width!: number;
  public height!: number;
  public rx!: number;
  public ry!: number;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGRectModel>) {
    super(params);
    this._id = Generator.getId('rect-');
    if (isNotUndefined(params.x)) this.x = params.x as number;
    if (isNotUndefined(params.y)) this.y = params.y as number;
    if (isNotUndefined(params.width)) this.width = params.width as number;
    if (isNotUndefined(params.height)) this.height = params.height as number;
    if (isNotUndefined(params.rx)) this.rx = params.rx as number;
    if (isNotUndefined(params.ry)) this.ry = params.ry as number;
  }

  public override render() {
    let res =
      `<rect ` +
      this.renderPart() +
      (isNotUndefined(this.x) ? ` x="${this.x}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y}"` : '') +
      (isNotUndefined(this.width) ? ` width="${this.width}"` : '') +
      (isNotUndefined(this.height) ? ` height="${this.height}"` : '') +
      (isNotUndefined(this.rx) ? ` rx="${this.rx}"` : '') +
      (isNotUndefined(this.ry) ? ` ry="${this.ry}"` : '') +
      `></rect>\n`;
    return res;
  }

  public static override importFromDom(dom: SVGRectElement) {
    const node = new SVGRectModel({
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      x: dom.getAttribute('x') ? parseFloat(dom.getAttribute('x')!) : undefined,
      y: dom.getAttribute('y') ? parseFloat(dom.getAttribute('y')!) : undefined,
      width: dom.getAttribute('width') ? parseFloat(dom.getAttribute('width')!) : undefined,
      height: dom.getAttribute('height') ? parseFloat(dom.getAttribute('height')!) : undefined,
    });

    return node;
  }

  public override anchorPoints(): VectorModel[] {
    return [
      new VectorModel(this.x, this.y),
      new VectorModel(this.x + this.width, this.y),
      new VectorModel(this.x + this.width, this.y + this.height),
      new VectorModel(this.x, this.y + this.height),
    ];
  }
}

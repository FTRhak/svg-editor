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

  public override renderSelectionMoveArea(fill: string, stroke: string, strokeWidth: number): string {
    const selectionRecSize = 0.1;
    let res =
      `<rect ` +
      this.renderPartStyle() +
      (isNotUndefined(this.x) ? ` x="${this.x}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y}"` : '') +
      (isNotUndefined(this.width) ? ` width="${this.width}"` : '') +
      (isNotUndefined(this.height) ? ` height="${this.height}"` : '') +
      ` fill="${fill}"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n` +
      // render selection move area
      `<rect ` +
      ` data-action="move"` +
      ` data-move="x_y"` +
      ` class="action-move"` +
      (isNotUndefined(this.x) ? ` x="${this.x - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n` +
      `<rect ` +
      ` data-action="transform"` +
      ` data-transform="width"` +
      ` class="action-transform"` +
      (isNotUndefined(this.x) ? ` x="${this.x + this.width - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n` +
      `<rect ` +
      ` data-action="transform"` +
      ` data-transform="height"` +
      ` class="action-transform"` +
      (isNotUndefined(this.x) ? ` x="${this.x - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y + this.height - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n` +
      `<rect ` +
      ` data-action="transform"` +
      ` data-transform="width_height"` +
      ` class="action-transform"` +
      (isNotUndefined(this.x) ? ` x="${this.x + this.width - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y + this.height - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n`;
    return res;
  }

  public override moveShift(shift: VectorModel) {
    this.x = (this.x || 0) + shift.x;
    this.y = (this.y || 0) + shift.y;

    return ['x', 'y'];
  }

  public override transformShift(anchor: string[], shift: VectorModel): string[] {
    anchor.forEach((item) => {
      if (item === 'width') {
        this.width = this.width + shift.x;
      } else if (item === 'height') {
        this.height = this.height + shift.y;
      }
    });

    return anchor;
  }

  public static override importFromDom(dom: SVGRectElement) {
    const node = new SVGRectModel({
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      transform: dom.getAttribute('transform')! || undefined,
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

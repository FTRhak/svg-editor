import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';
import { VectorModel } from './vector.model';

export class SVGCircleModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.CIRCLE;
  public override readonly _id: PID;
  public cx: number = 0;
  public cy: number = 0;
  public r: number = 0;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGCircleModel>) {
    super(params);
    this._id = Generator.getId('circle-');
    if (isNotUndefined(params.cx)) this.cx = params.cx as number;
    if (isNotUndefined(params.cy)) this.cy = params.cy as number;
    if (isNotUndefined(params.r)) this.r = params.r as number;
  }

  public override render() {
    let res =
      `<circle ` +
      this.renderPart() +
      (isNotUndefined(this.cx) ? ` cx="${this.cx}"` : '') +
      (isNotUndefined(this.cy) ? ` cy="${this.cy}"` : '') +
      (isNotUndefined(this.r) ? ` r="${this.r}"` : '') +
      `/>\n`;
    return res;
  }

  public override renderSelectionMoveArea(fill: string, stroke: string, strokeWidth: number): string {
    const selectionRecSize = 0.1;
    let res =
      `<circle ` +
      this.renderPartStyle() +
      (isNotUndefined(this.cx) ? ` cx="${this.cx}"` : '') +
      (isNotUndefined(this.cy) ? ` cy="${this.cy}"` : '') +
      (isNotUndefined(this.r) ? ` r="${this.r}"` : '') +
      ` fill="${fill}"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></circle>\n` +
      // render selection move area;
      `<rect ` +
      (isNotUndefined(this.cx) ? ` x="${this.cx - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.cy) ? ` y="${this.cy - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` data-action="move"` +
      ` data-move="cx_cy"` +
      ` class="action-move"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n` +
      `<rect ` +
      ` class="action-transform"` +
      ` data-action="transform"` +
      ` data-transform="r"` +
      (isNotUndefined(this.cx) ? ` x="${this.cx + this.r - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.cy) ? ` y="${this.cy - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n`;
    return res;
  }

  public override moveShift(shift: VectorModel): string[] {
    this.cx = (this.cx || 0) + shift.x;
    this.cy = (this.cy || 0) + shift.y;

    return ['cx', 'cy'];
  }

  public override transformShift(anchor: string[], shift: VectorModel): string[] {
    if (anchor[0] === 'r') {
      this.r = this.r + shift.x;
      return ['r'];
    } else {
      return []; // do nothing
    }
  }

  public static override importFromDom(dom: SVGCircleElement) {
    const node = new SVGCircleModel({
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      transform: dom.getAttribute('transform')! || undefined,
      cx: dom.getAttribute('cx') ? parseFloat(dom.getAttribute('cx')!) : undefined,
      cy: dom.getAttribute('cy') ? parseFloat(dom.getAttribute('cy')!) : undefined,
      r: dom.getAttribute('r') ? parseFloat(dom.getAttribute('r')!) : undefined,
    });

    return node;
  }
}

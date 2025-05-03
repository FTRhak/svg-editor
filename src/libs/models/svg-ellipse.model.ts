import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';
import { VectorModel } from './vector.model';

export class SVGEllipseModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.ELLIPSE;
  public override readonly _id: PID;

  //#region property CX
  private _cx: number = 0;

  public get cx() {
    return this._cx;
  }

  public set cx(value: number) {
    this._cx = value;
  }
  //#endregion

  //#region property CY
  private _cy: number = 0;

  public get cy() {
    return this._cy;
  }

  public set cy(value: number) {
    this._cy = value;
  }
  //#endregion

  //#region property RX
  private _rx: number = 0;

  public get rx() {
    return this._rx;
  }

  public set rx(value: number) {
    this._rx = value < 0 ? 0 : value;
  }
  //#endregion

  //#region property RY
  private _ry: number = 0;

  public get ry() {
    return this._ry;
  }

  public set ry(value: number) {
    this._ry = value < 0 ? 0 : value;
  }
  //#endregion

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

  public override renderSelectionMoveArea(fill: string, stroke: string, strokeWidth: number): string {
    const selectionRecSize = 0.1;
    let res =
      `<ellipse ` +
      this.renderPartStyle() +
      (isNotUndefined(this.cx) ? ` cx="${this.cx}"` : '') +
      (isNotUndefined(this.cy) ? ` cy="${this.cy}"` : '') +
      (isNotUndefined(this.rx) ? ` rx="${this.rx}"` : '') +
      (isNotUndefined(this.ry) ? ` ry="${this.ry}"` : '') +
      ` fill="${fill}"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></ellipse>\n` +
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
      ` data-transform="rx"` +
      (isNotUndefined(this.cx) ? ` x="${this.cx + this.rx - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.cy) ? ` y="${this.cy - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n` +
      `<rect ` +
      ` class="action-transform"` +
      ` data-action="transform"` +
      ` data-transform="ry"` +
      (isNotUndefined(this.cx) ? ` x="${this.cx - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.cy) ? ` y="${this.cy + this.ry - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n`;
    return res;
  }

  public override moveShift(shift: VectorModel) {
    this.cx = (this.cx || 0) + shift.x;
    this.cy = (this.cy || 0) + shift.y;

    return ['cx', 'cy'];
  }

  public override transformShift(anchor: string[], shift: VectorModel): string[] {
    if (anchor[0] === 'rx') {
      this.rx = this.rx + shift.x;
      return ['rx'];
    } else if (anchor[0] === 'ry') {
      this.ry = this.ry + shift.y;
      return ['ry'];
    } else {
      return []; // do nothing
    }
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

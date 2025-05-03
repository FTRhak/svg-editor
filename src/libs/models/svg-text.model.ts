import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';
import { VectorModel } from './vector.model';

export class SVGTextModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.TEXT;
  public override readonly _id: PID;

  //#region property X
  private _x!: number;

  public get x() {
    return this._x;
  }

  public set x(value: number) {
    this._x = value;
  }
  //#endregion

  //#region property Y
  private _y!: number;

  public get y() {
    return this._y;
  }

  public set y(value: number) {
    this._y = value;
  }
  //#endregion

  //#region property DX
  private _dx!: number;
  public get dx() {
    return this._dx;
  }

  public set dx(value: number) {
    this._dx = value;
  }
  //#endregion

  //#region property DY
  private _dy!: number;
  public get dy() {
    return this._dy;
  }

  public set dy(value: number) {
    this._dy = value;
  }
  //#endregion

  public text!: string;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGTextModel>) {
    super(params);
    this._id = Generator.getId('text-');
    if (isNotUndefined(params.x)) this.x = params.x as number;
    if (isNotUndefined(params.y)) this.y = params.y as number;
    if (isNotUndefined(params.dx)) this.dx = params.dx as number;
    if (isNotUndefined(params.dy)) this.dy = params.dy as number;
    this.text = params.text || '';
  }

  public override render() {
    let res =
      `<text ` +
      this.renderPart() +
      (isNotUndefined(this.x) ? ` x="${this.x}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y}"` : '') +
      (isNotUndefined(this.dx) ? ` dx="${this.dx}"` : '') +
      (isNotUndefined(this.dy) ? ` dy="${this.dy}"` : '') +
      `>${this.text}</text>\n`;
    return res;
  }

  public override renderSelectionMoveArea(fill: string, stroke: string, strokeWidth: number): string {
    const selectionRecSize = 0.1;
    const width = 1;
    const height = 0.5;
    let res =
      /**
      `<rect ` +
      this.renderPartStyle() +
      (isNotUndefined(this.x) ? ` x="${this.x}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y - height}"` : '') +
      (isNotUndefined(width) ? ` width="${width}"` : '') +
      (isNotUndefined(height) ? ` height="${height}"` : '') +
      ` fill="${fill}"` +
      `></rect>\n` +
       */
      // render selection move area
      `<line x1="${this.x}" y1="${this.y}" x2="${this.x}" y2="${this.y - height}" stroke="${stroke}" stroke-width="${strokeWidth}" ></line>` +
      `<line x1="${this.x}" y1="${this.y}" x2="${this.x + width}" y2="${this.y}" stroke="${stroke}" stroke-width="${strokeWidth}" ></line>` +
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
      `></rect>\n`;
    return res;
  }

  public override moveShift(shift: VectorModel) {
    this.x = (this.x || 0) + shift.x;
    this.y = (this.y || 0) + shift.y;

    return ['x', 'y'];
  }

  public static override importFromDom(dom: SVGTextElement) {
    const node = new SVGTextModel({
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      transform: dom.getAttribute('transform')! || undefined,
      x: dom.getAttribute('x') ? parseFloat(dom.getAttribute('x')!) : undefined,
      y: dom.getAttribute('y') ? parseFloat(dom.getAttribute('y')!) : undefined,
      dx: dom.getAttribute('dx') ? parseFloat(dom.getAttribute('dx')!) : undefined,
      dy: dom.getAttribute('dy') ? parseFloat(dom.getAttribute('dy')!) : undefined,
    });

    return node;
  }
}

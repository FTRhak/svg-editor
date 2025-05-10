import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';
import { VectorModel } from './vector.model';

export class SVGLineModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.LINE;
  public override readonly _id: PID;

  //#region property X1
  private _x1!: number;

  public get x1(): number {
    return this._x1;
  }

  public set x1(value: number) {
    this._x1 = value;
  }
  //#endregion

  //#region property Y1
  public _y1!: number;

  public get y1(): number {
    return this._y1;
  }

  public set y1(value: number) {
    this._y1 = value;
  }
  //#endregion

  //#region property X2
  public _x2!: number;

  public get x2(): number {
    return this._x2;
  }

  public set x2(value: number) {
    this._x2 = value;
  }
  //#endregion

  //#region property Y2
  public _y2!: number;

  public get y2(): number {
    return this._y2;
  }

  public set y2(value: number) {
    this._y2 = value;
  }
  //#endregion

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

  public override renderSelectionMoveArea(fill: string, stroke: string, strokeWidth: number): string {
    const selectionRecSize = 0.1;
    let res =
      `<line ` +
      this.renderPartStyle() +
      (isNotUndefined(this.x1) ? ` x1="${this.x1}"` : '') +
      (isNotUndefined(this.y1) ? ` y1="${this.y1}"` : '') +
      (isNotUndefined(this.x2) ? ` x2="${this.x2}"` : '') +
      (isNotUndefined(this.y2) ? ` y2="${this.y2}"` : '') +
      ` fill="none"` +
      ` stroke="${fill}" stroke-width="${strokeWidth}" ` +
      `></line>\n` +
      // render selection move area
      `<rect ` +
      ` data-action="transform"` +
      ` data-transform="x1_y1"` +
      ` class="action-move"` +
      (isNotUndefined(this.x1) ? ` x="${this.x1 - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.y1) ? ` y="${this.y1 - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n` +
      `<rect ` +
      ` data-action="transform"` +
      ` data-transform="x2_y2"` +
      ` class="action-transform"` +
      (isNotUndefined(this.x2) ? ` x="${this.x2 - selectionRecSize / 2}"` : '') +
      (isNotUndefined(this.y2) ? ` y="${this.y2 - selectionRecSize / 2}"` : '') +
      ` width="0.1"` +
      ` height="0.1"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n`;
    return res;
  }

  public override moveShift(shift: VectorModel) {
    this.x1 = (this.x1 || 0) + shift.x;
    this.y1 = (this.y1 || 0) + shift.y;
    this.x2 = (this.x2 || 0) + shift.x;
    this.y2 = (this.y2 || 0) + shift.y;

    return ['x1', 'y1', 'x2', 'y2'];
  }

  public override transformShift(anchor: string[], shift: VectorModel): string[] {
    anchor.forEach((item) => {
      if (item === 'x1') {
        this.x1 = this.x1 + shift.x;
      } else if (item === 'y1') {
        this.y1 = this.y1 + shift.y;
      } else if (item === 'x2') {
        this.x2 = this.x2 + shift.x;
      } else if (item === 'y2') {
        this.y2 = this.y2 + shift.y;
      }
    });

    return anchor;
  }

  public override resize(xCoefficient: number, yCoefficient: number): string[] {
    this.x1 *= xCoefficient;
    this.y1 *= yCoefficient;
    this.x2 *= xCoefficient;
    this.y2 *= yCoefficient;
    return ['x1', 'y1', 'x2', 'y2'];
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

import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';
import { isNotUndefined } from '@libs/utils';

export class SVGPathNodeMModel extends SVGPathNodeModel {
  public static readonly ParamsCount = 2;

  //#region property X
  private _x!: number;

  public set x(value: number) {
    this._x = value;
  }

  public get x(): number {
    return this._x;
  }
  //#endregion

  //#region property Y
  private _y!: number;

  public set y(value: number) {
    this._y = value;
  }

  public get y(): number {
    return this._y;
  }
  //#endregion

  constructor(type: SVGPathNodeType, params: string[], prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);

    this.x = parseFloat(params[0] || '0');
    this.y = parseFloat(params[1] || '0');
  }

  public override render(): string {
    return `${this.type}${this.x},${this.y}` + (this._next ? this._next.render() : '');
  }

  public override renderSelectionMoveArea(
    fill: string,
    stroke: string,
    strokeWidth: number,
    selectionRecSize: number = 0.1,
  ): string {
    let res = '';

    res +=
      `<rect ` +
      ` data-action="transform"` +
      ` data-transform="width"` +
      ` class="action-transform"` +
      ` x="${this._x - selectionRecSize / 2}"` +
      ` y="${this._y - selectionRecSize / 2}"` +
      ` width="${selectionRecSize}"` +
      ` height="${selectionRecSize}"` +
      ` fill="blue"` +
      ` stroke="${stroke}" stroke-width="${strokeWidth}" ` +
      `></rect>\n`;
    return res;
  }

  public override moveShift(shift: VectorModel): void {
    if (!this.isLocal) {
      this._x += shift.x;
      this._y += shift.y;
    }
  }

  public override getMaxPoint(): VectorModel {
    return new VectorModel(this._x, this._y);
  }

  public override resize(xCoefficient: number, yCoefficient: number): void {
    this._x *= xCoefficient;
    this._y *= yCoefficient;
  }
}

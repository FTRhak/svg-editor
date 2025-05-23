import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeCModel extends SVGPathNodeModel {
  public static readonly ParamsCount = 6;

  public x1!: number;
  public y1!: number;
  public x2!: number;
  public y2!: number;
  public x!: number;
  public y!: number;
  constructor(type: SVGPathNodeType, params: string[], prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);

    this.x1 = parseFloat(params[0] || '0');
    this.y1 = parseFloat(params[1] || '0');
    this.x2 = parseFloat(params[2] || '0');
    this.y2 = parseFloat(params[3] || '0');
    this.x = parseFloat(params[4] || '0');
    this.y = parseFloat(params[5] || '0');
  }

  public override render(): string {
    return (
      `${this.type}${this.x1},${this.y1},${this.x2},${this.y2},${this.x},${this.y}` +
      (this._next ? this._next.render() : '')
    );
  }

  public override moveShift(shift: VectorModel): void {
    if (!this.isLocal) {
      this.x1 = (this.x1 || 0) + shift.x;
      this.y1 = (this.y1 || 0) + shift.y;
      this.x2 = (this.x2 || 0) + shift.x;
      this.y2 = (this.y2 || 0) + shift.y;
      this.x = (this.x || 0) + shift.x;
      this.y = (this.y || 0) + shift.y;
    }
  }

  public override getMaxPoint(): VectorModel {
    return new VectorModel(Math.max(this.x1, this.x2, this.x), Math.max(this.y1, this.y2, this.y));
  }

  public override resize(xCoefficient: number, yCoefficient: number): void {
    this.x1 *= xCoefficient;
    this.y1 *= yCoefficient;
    this.x2 *= xCoefficient;
    this.y2 *= yCoefficient;
    this.x *= xCoefficient;
    this.y *= yCoefficient;
  }
}

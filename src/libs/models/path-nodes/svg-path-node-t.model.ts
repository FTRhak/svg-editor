import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeTModel extends SVGPathNodeModel {
  public static readonly ParamsCount = 2;

  public x!: number;
  public y!: number;
  constructor(type: SVGPathNodeType, params: string[], prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);

    this.x = parseFloat(params[0] || '0');
    this.y = parseFloat(params[1] || '0');
  }

  public override render(): string {
    return `${this.type}${this.x},${this.y}` + (this._next ? this._next.render() : '');
  }

  public override moveShift(shift: VectorModel): void {
    if (!this.isLocal) {
      this.x = (this.x || 0) + shift.x;
      this.y = (this.y || 0) + shift.y;
    }
  }

  public override getMaxPoint(): VectorModel {
    return new VectorModel(this.x, this.y);
  }

  public override resize(xCoefficient: number, yCoefficient: number): void {
    this.x *= xCoefficient;
    this.y *= yCoefficient;
  }
}

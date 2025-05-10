import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeVModel extends SVGPathNodeModel {
  public static readonly ParamsCount = 1;

  public y!: number;
  constructor(type: SVGPathNodeType, params: string[], prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
    this.y = parseFloat(params[0] || '0');
  }

  public override render(): string {
    return `${this.type}${this.y}` + (this._next ? this._next.render() : '');
  }

  public override moveShift(shift: VectorModel): void {
    if (!this.isLocal) {
      this.y = (this.y || 0) + shift.y;
    }
  }

  public override getMaxPoint(): VectorModel {
    return new VectorModel(this.prev?.getMaxPoint().x || 0, this.y);
  }

  public override resize(xCoefficient: number, yCoefficient: number): void {
    this.y *= yCoefficient;
  }
}

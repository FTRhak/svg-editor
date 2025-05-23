import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeZModel extends SVGPathNodeModel {
  public static readonly ParamsCount = 0;

  constructor(type: SVGPathNodeType, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
  }

  public override render(): string {
    return `${this.type} ` + (this._next ? this._next.render() : '');
  }

  public override moveShift(shift: VectorModel): void {}

  public override getMaxPoint(): VectorModel {
    return this.prev?.getMaxPoint() || new VectorModel(0, 0);
  }

  public override resize(xCoefficient: number, yCoefficient: number): void {}
}

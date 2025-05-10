import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeAModel extends SVGPathNodeModel {
  public static readonly ParamsCount = 7;

  public rx!: number;
  public ry!: number;
  public xAxisRotation!: number;
  public largeArcFlag!: number; // boolean
  public sweepFlag!: number; // boolean
  public x!: number;
  public y!: number;

  constructor(type: SVGPathNodeType, params: string[], prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);

    this.rx = parseFloat(params[0] || '0');
    this.ry = parseFloat(params[1] || '0');
    this.xAxisRotation = parseFloat(params[2] || '0');
    this.largeArcFlag = parseInt(params[3] || '0');
    this.sweepFlag = parseInt(params[4] || '0');
    this.x = parseFloat(params[5] || '0');
    this.y = parseFloat(params[6] || '0');
  }

  public override render(): string {
    return (
      `${this.type}${this.rx},${this.ry},${this.xAxisRotation},${this.largeArcFlag},${this.sweepFlag},${this.x},${this.y}` +
      (this._next ? this._next.render() : '')
    );
  }

  public override moveShift(shift: VectorModel): void {
    if (!this.isLocal) {
      this.rx += shift.x;
      this.ry += shift.y;
      this.x += shift.x;
      this.y += shift.y;
    }
  }

  public override getMaxPoint(): VectorModel {
    return new VectorModel(this.x, this.y);
  }

  public override resize(xCoefficient: number, yCoefficient: number): void {
    this.rx *= xCoefficient;
    this.ry *= yCoefficient;
    this.x *= xCoefficient;
    this.y *= yCoefficient;
  }
}

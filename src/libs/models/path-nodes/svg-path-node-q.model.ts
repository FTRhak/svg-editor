import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeQModel extends SVGPathNodeModel {
  public x1!: number;
  public y1!: number;
  public x!: number;
  public y!: number;
  constructor(type: SVGPathNodeType, paramValues: string, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);

    const params = this.normalizeParams(paramValues, 4);

    this.x1 = parseFloat(params[0] || '0');
    this.y1 = parseFloat(params[1] || '0');
    this.x = parseFloat(params[2] || '0');
    this.y = parseFloat(params[3] || '0');
  }

  public override render(): string {
    return `${this.type}${this.x1},${this.y1},${this.x},${this.y}` + (this._next ? this._next.render() : '');
  }

  public override moveShift(shift: VectorModel): void {
    if (!this.isLocal) {
      this.x1 = (this.x1 || 0) + shift.x;
      this.y1 = (this.y1 || 0) + shift.y;
      this.x = (this.x || 0) + shift.x;
      this.y = (this.y || 0) + shift.y;
    }
  }
}

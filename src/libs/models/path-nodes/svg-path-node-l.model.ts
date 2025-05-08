import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeLModel extends SVGPathNodeModel {
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
      this.x += shift.x;
      this.y += shift.y;
    }
  }
}

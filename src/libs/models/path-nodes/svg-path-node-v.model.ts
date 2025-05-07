import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeVModel extends SVGPathNodeModel {
  public y!: number;
  constructor(type: SVGPathNodeType, paramValues?: string, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
    this.y = parseFloat(paramValues || '0');
  }

  public override render(): string {
    return `${this.type}${this.y}` + (this._next ? this._next.render() : '');
  }

  public override moveShift(shift: VectorModel): void {
    if (!this.isLocal) {
      this.y = (this.y || 0) + shift.y;
    }
  }
}

import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from './svg-path-node.type';

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
}

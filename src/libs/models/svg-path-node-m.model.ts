import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from './svg-path-node.type';

export class SVGPathNodeMModel extends SVGPathNodeModel {
  public x!: number;
  public y!: number;
  constructor(type: SVGPathNodeType, paramValues?: string, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
    const params = paramValues!.split(',');
    this.x = parseFloat(params[0] || '0');
    this.y = parseFloat(params[1] || '0');
  }

  public override render(): string {
    return `${this.type}${this.x},${this.y}` + (this._next ? this._next.render() : '');
  }
}

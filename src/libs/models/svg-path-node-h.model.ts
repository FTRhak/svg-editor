import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from './svg-path-node.type';

export class SVGPathNodeHModel extends SVGPathNodeModel {
  public x!: number;

  constructor(type: SVGPathNodeType, paramValues?: string, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
    this.x = parseFloat(paramValues || '0');
  }

  public override render(): string {
    return `${this.type}${this.x}` + (this._next ? this._next.render() : '');
  }
}

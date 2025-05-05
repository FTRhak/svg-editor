import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from './svg-path-node.type';

export class SVGPathNodeVModel extends SVGPathNodeModel {
  public y!: number;
  constructor(type: SVGPathNodeType, paramValues?: string, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
    this.y = parseFloat(paramValues || '0');
  }

  public override render(): string {
    return `${this.type}${this.y}`;
  }
}

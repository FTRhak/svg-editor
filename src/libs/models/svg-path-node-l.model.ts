import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from './svg-path-node.type';

export class SVGPathNodeLModel extends SVGPathNodeModel {
  public x!: number;
  public y!: number;
  constructor(type: SVGPathNodeType, paramValues?: string, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
    //this.x = x;
    //this.y = y;
  }
}

import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from './svg-path-node.type';

export class SVGPathNodeZModel extends SVGPathNodeModel {
  constructor(type: SVGPathNodeType, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
    //this.x = x;
    //this.y = y;
  }
}

import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from './svg-path-node.type';

export class SVGPathNodeQModel extends SVGPathNodeModel {
  constructor(type: SVGPathNodeType, paramValues?: string, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
  }
}

import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from './svg-path-node.type';

export class SVGPathNodeZModel extends SVGPathNodeModel {
  constructor(type: SVGPathNodeType, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);
  }

  public override render(): string {
    return `${this.type} ` + (this._next ? this._next.render() : '');
  }
}

import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { SVGGroupModel } from './svg-group.model';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGPathModel extends TreeNodeModel implements TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.PATH;
  public override readonly _id: PID;
  public fill!: string;
  public stroke!: string;
  public strokeWidth!: number;
  public transform!: string;
  public style!: string;
  public d!: string;

  public override children: SVGGroupModel[] = [];

  constructor(params: Partial<SVGPathModel>) {
    super();
    this._id = Generator.getId('path-');
  }

  public override render() {
    let res =
      `<path id="${this._id}" ` +
      (isNotUndefined(this.fill) ? ` fill="${this.fill}"` : '') +
      (isNotUndefined(this.stroke) ? ` stroke="${this.stroke}"` : '') +
      (isNotUndefined(this.strokeWidth) ? ` stroke-width="${this.strokeWidth}"` : '') +
      (isNotUndefined(this.transform) ? ` transform="${this.transform}"` : '') +
      (isNotUndefined(this.style) ? ` style="${this.style}"` : '') +
      (isNotUndefined(this.d) ? ` d="${this.d}"` : '') +
      `></path>`;
    return res;
  }
}

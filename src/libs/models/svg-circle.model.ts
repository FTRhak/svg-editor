import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGCircleModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.CIRCLE;
  public override readonly _id: PID;
  public cx: number = 0;
  public cy: number = 0;
  public r: number = 0;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGCircleModel>) {
    super(params);
    this._id = Generator.getId('circle-');
    if (isNotUndefined(params.cx)) this.cx = params.cx as number;
    if (isNotUndefined(params.cy)) this.cy = params.cy as number;
    if (isNotUndefined(params.r)) this.r = params.r as number;
  }

  public override render() {
    let res =
      `<circle ` +
      this.renderPart() +
      (isNotUndefined(this.cx) ? ` cx="${this.cx}"` : '') +
      (isNotUndefined(this.cy) ? ` cy="${this.cy}"` : '') +
      (isNotUndefined(this.r) ? ` r="${this.r}"` : '') +
      `></circle>`;
    return res;
  }
}

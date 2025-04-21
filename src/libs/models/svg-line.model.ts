import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGLineModel extends TreeNodeModel implements TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.LINE;
  public override readonly _id: PID;
  public fill!: string;
  public stroke!: string;
  public strokeWidth!: number;
  public transform!: string;
  public style!: string;
  public x1!: number;
  public y1!: number;
  public x2!: number;
  public y2!: number;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGLineModel>) {
    super();
    this._id = Generator.getId('line-');
    if (isNotUndefined(params.x1)) this.x1 = params.x1 as number;
    if (isNotUndefined(params.y1)) this.y1 = params.y1 as number;
    if (isNotUndefined(params.x2)) this.x2 = params.x2 as number;
    if (isNotUndefined(params.y2)) this.y2 = params.y2 as number;
  }

  public override render() {
    let res =
      `<line id="${this._id}" ` +
      (isNotUndefined(this.fill) ? ` fill="${this.fill}"` : '') +
      (isNotUndefined(this.stroke) ? ` stroke="${this.stroke}"` : '') +
      (isNotUndefined(this.strokeWidth) ? ` stroke-width="${this.strokeWidth}"` : '') +
      (isNotUndefined(this.transform) ? ` transform="${this.transform}"` : '') +
      (isNotUndefined(this.style) ? ` style="${this.style}"` : '') +
      (isNotUndefined(this.x1) ? ` x1="${this.x1}"` : '') +
      (isNotUndefined(this.y1) ? ` y1="${this.y1}"` : '') +
      (isNotUndefined(this.x2) ? ` x2="${this.x2}"` : '') +
      (isNotUndefined(this.y2) ? ` y2="${this.y2}"` : '') +
      `></line>`;
    return res;
  }
}

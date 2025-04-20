import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { SVGGroupModel } from './svg-group.model';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGEllipseModel extends TreeNodeModel implements TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.ELLIPSE;
  public override readonly _id: PID;
  public fill!: string;
  public stroke!: string;
  public strokeWidth!: number;
  public cx: number = 0;
  public cy: number = 0;
  public rx: number = 0;
  public ry: number = 0;

  public override children: SVGGroupModel[] = [];

  constructor(params: Partial<SVGEllipseModel>) {
    super();
    this._id = Generator.getId('ellipse-');
    if (isNotUndefined(params.cx)) this.cx = params.cx as number;
    if (isNotUndefined(params.cy)) this.cy = params.cy as number;
    if (isNotUndefined(params.rx)) this.rx = params.rx as number;
    if (isNotUndefined(params.ry)) this.ry = params.ry as number;
  }

  public override render() {
    let res =
      `<ellipse id="${this._id}" ` +
      (isNotUndefined(this.fill) ? ` fill="${this.fill}"` : '') +
      (isNotUndefined(this.stroke) ? ` stroke="${this.stroke}"` : '') +
      (isNotUndefined(this.strokeWidth) ? ` stroke-width="${this.strokeWidth}"` : '') +
      (isNotUndefined(this.cx) ? ` cx="${this.cx}"` : '') +
      (isNotUndefined(this.cy) ? ` cy="${this.cy}"` : '') +
      (isNotUndefined(this.rx) ? ` rx="${this.rx}"` : '') +
      (isNotUndefined(this.ry) ? ` ry="${this.ry}"` : '') +
      `></ellipse>`;
    return res;
  }
}

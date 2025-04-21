import { Generator, isNotUndefined } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { SVGGroupModel } from './svg-group.model';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';
import { VectorModel } from './vector.model';

export class SVGRectModel extends TreeNodeModel implements TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.RECT;
  public override readonly _id: PID;
  public fill!: string;
  public stroke!: string;
  public strokeWidth!: number;
  public transform!: string;
  public style!: string;
  public x!: number;
  public y!: number;
  public width!: number;
  public height!: number;
  public rx!: number;
  public ry!: number;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGRectModel>) {
    super();
    this._id = Generator.getId('rect-');
    if (isNotUndefined(params.x)) this.x = params.x as number;
    if (isNotUndefined(params.y)) this.y = params.y as number;
    if (isNotUndefined(params.width)) this.width = params.width as number;
    if (isNotUndefined(params.height)) this.height = params.height as number;
    if (isNotUndefined(params.rx)) this.rx = params.rx as number;
    if (isNotUndefined(params.ry)) this.ry = params.ry as number;
  }

  public override render() {
    let res =
      `<rect id="${this._id}" ` +
      (isNotUndefined(this.fill) ? ` fill="${this.fill}"` : '') +
      (isNotUndefined(this.stroke) ? ` stroke="${this.stroke}"` : '') +
      (isNotUndefined(this.strokeWidth) ? ` stroke-width="${this.strokeWidth}"` : '') +
      (isNotUndefined(this.transform) ? ` transform="${this.transform}"` : '') +
      (isNotUndefined(this.style) ? ` style="${this.style}"` : '') +
      (isNotUndefined(this.x) ? ` x="${this.x}"` : '') +
      (isNotUndefined(this.y) ? ` y="${this.y}"` : '') +
      (isNotUndefined(this.width) ? ` width="${this.width}"` : '') +
      (isNotUndefined(this.height) ? ` height="${this.height}"` : '') +
      (isNotUndefined(this.rx) ? ` rx="${this.rx}"` : '') +
      (isNotUndefined(this.ry) ? ` ry="${this.ry}"` : '') +
      `></rect>`;
    return res;
  }

  public override anchorPoints(): VectorModel[] {
    return [
      new VectorModel(this.x, this.y),
      new VectorModel(this.x + this.width, this.y),
      new VectorModel(this.x + this.width, this.y + this.height),
      new VectorModel(this.x, this.y + this.height),
    ];
  }
}

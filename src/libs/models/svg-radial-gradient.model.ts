import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeModel } from './tree-node.model';
import { TreeNodeGradientModel } from './tree-node-gradient.model';

export class SVGRadialGradientModel extends TreeNodeGradientModel {
  public override readonly _type = SVGNodeType.RADIAL_GRADIENT;
  public override readonly _id: PID;

  public cx!: number;
  public cy!: number;
  public fr!: number;
  public fx!: number;
  public fy!: number;
  public r!: number;
  public gradientUnits!: string; // objectBoundingBox | userSpaceOnUse

  public href!: string;
  public spreadMethod!: string; // pad | reflect | repeat

  //  public xlinkHref!: string; // xlink:href

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGRadialGradientModel>) {
    super(params);
    this._id = Generator.getId('radialGradient-');

    if (isNotUndefined(params.cx)) this.cx = params.cx as number;
    if (isNotUndefined(params.cy)) this.cy = params.cy as number;
    if (isNotUndefined(params.fr)) this.fr = params.fr as number;
    if (isNotUndefined(params.fx)) this.fx = params.fx as number;
    if (isNotUndefined(params.fy)) this.fy = params.fy as number;
    if (isNotUndefined(params.r)) this.r = params.r as number;
    if (isNotUndefined(params.gradientUnits)) this.gradientUnits = params.gradientUnits as string;

    if (isNotUndefined(params.href)) this.href = params.href as string;
    if (isNotUndefined(params.spreadMethod)) this.spreadMethod = params.spreadMethod as string;
  }

  public override render() {
    let res =
      `<radialGradient ` +
      this.renderId() +
      (isNotUndefined(this.id) ? ` id="${this.id}"` : '') +
      (isNotUndefined(this.gradientTransform) ? ` gradientTransform="rotate(${this.gradientTransform})"` : '') +
      `>\n`;

    this.children.forEach((child) => (res += '  ' + child.render()));

    res += `</radialGradient>\n`;
    return res;
  }

  public override clone(): SVGRadialGradientModel {
    const item = new SVGRadialGradientModel(this);
    item.children = this.children.map((child) => child.clone());

    return item;
  }
}

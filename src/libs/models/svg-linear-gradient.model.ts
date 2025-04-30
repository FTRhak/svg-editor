import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeModel } from './tree-node.model';

export class SVGLinearGradientModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.LINEAR_GRADIENT;
  public override readonly _id: PID;

  public id!: string;
  public gradientTransform: number = 0;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGLinearGradientModel>) {
    super();
    this._id = Generator.getId('linearGradient-');

    if (isNotUndefined(params.id)) this.id = params.id as string;
    if (isNotUndefined(params.gradientTransform)) this.gradientTransform = params.gradientTransform as number;
  }

  public override render() {
    let res =
      `<linearGradient ` +
      this.renderId() +
      (isNotUndefined(this.id) ? ` id="${this.id}"` : '') +
      (isNotUndefined(this.gradientTransform) ? ` gradientTransform="rotate(${this.gradientTransform})"` : '') +
      `>\n`;

    this.children.forEach((child) => (res += '  ' + child.render()));

    res += `</linearGradient>\n`;
    return res;
  }
}

import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeModel } from './tree-node.model';
import { TreeNodeGradientModel } from './tree-node-gradient.model';

export class SVGLinearGradientModel extends TreeNodeGradientModel {
  public override readonly _type = SVGNodeType.LINEAR_GRADIENT;
  public override readonly _id: PID;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGLinearGradientModel>) {
    super(params);
    this._id = Generator.getId('linearGradient-');
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

  public override clone(): SVGLinearGradientModel {
    const item = new SVGLinearGradientModel(this);
    item.children = this.children.map((child) => child.clone());

    return item;
  }
}

import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeModel } from './tree-node.model';
import { SVGStopModel } from './svg-stop.model';

export class SVGLinearGradientModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.LINEAR_GRADIENT;
  public override readonly _id: PID;

  public id!: string;
  gradientTransform: number = 0;
  stops: SVGStopModel[] = [];

  //public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGLinearGradientModel>) {
    super();
    this._id = Generator.getId('linearGradient-');

    //this.stops = params.stops || [];
  }

  public override render() {
    let res =
      `<linearGradient ` +
      (isNotUndefined(this.id) ? ` id="${this.id}"` : '') +
      (isNotUndefined(this.gradientTransform) ? ` gradientTransform="rotate(${this.gradientTransform})"` : '') +
      `>\n`;

    this.stops.forEach((child) => (res += '  ' + child.render()));

    res += `</linearGradient>\n`;
    return res;
  }
}

import { Generator, isNotUndefined } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeModel } from './tree-node.model';

export class SVGStopModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.STOP;
  public override readonly _id: PID;

  public offset!: number;
  public stopColor!: string;
  public stopOpacity!: number;

  constructor(params: Partial<SVGStopModel>) {
    super();
    this._id = Generator.getId('stop-');
  }

  public override render() {
    let res =
      `<stop ` +
      (isNotUndefined(this.offset) ? ` offset="${this.offset}"` : '') +
      (isNotUndefined(this.stopColor) ? ` stop-color="rotate(${this.stopColor})"` : '') +
      (isNotUndefined(this.stopOpacity) ? ` stop-opacity="rotate(${this.stopOpacity})"` : '') +
      `/>\n`;
    return res;
  }
}

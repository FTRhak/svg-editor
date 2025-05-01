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
    super(params);
    this._id = Generator.getId('stop-');

    if (isNotUndefined(params.offset)) this.offset = params.offset as number;
    if (isNotUndefined(params.stopColor)) this.stopColor = params.stopColor as string;
    if (isNotUndefined(params.stopOpacity)) this.stopOpacity = params.stopOpacity as number;
  }

  public override render() {
    let res =
      `<stop ` +
      this.renderId() +
      (isNotUndefined(this._id) ? ` id="${this._id}"` : '') +
      (isNotUndefined(this.offset) ? ` offset="${this.offset}"` : '') +
      (isNotUndefined(this.stopColor) ? ` stop-color="${this.stopColor}"` : '') +
      (isNotUndefined(this.stopOpacity) ? ` stop-opacity="${this.stopOpacity}"` : '') +
      `/>\n`;
    return res;
  }

  public override clone(): SVGStopModel {
    return new SVGStopModel(this);
  }
}

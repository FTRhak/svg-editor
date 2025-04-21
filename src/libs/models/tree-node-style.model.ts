import { hasStyleProperties, isNotUndefined, styleToString } from '@libs/utils';
import { TreeNodeModel } from './tree-node.model';
import { StyleAttributeModel } from './style-attribute.model';

export class TreeNodeStyleModel extends TreeNodeModel {
  public static renderDebug: boolean = true;

  public fill!: string;
  public stroke!: string;
  public strokeWidth!: number;
  public transform!: string;
  public style!: StyleAttributeModel;

  constructor(params: Partial<TreeNodeStyleModel>) {
    super();
    if (isNotUndefined(params.fill)) this.fill = params.fill as string;
    if (isNotUndefined(params.stroke)) this.stroke = params.stroke as string;
    if (isNotUndefined(params.strokeWidth)) this.strokeWidth = params.strokeWidth as number;
    if (isNotUndefined(params.style)) this.style = params.style || {};
    if (isNotUndefined(params.transform)) this.transform = params.transform as string;
  }

  public renderPart(): string {
    let res = ``;
    if (TreeNodeStyleModel.renderDebug) {
      res += ` id="${this._id}"`;
    }

    if (isNotUndefined(this.fill)) res += ` fill="${this.fill}"`;
    if (isNotUndefined(this.stroke)) res += ` stroke="${this.stroke}"`;
    if (isNotUndefined(this.strokeWidth)) res += ` stroke-width="${this.strokeWidth}"`;
    if (isNotUndefined(this.transform)) res += ` transform="${this.transform}"`;
    if (hasStyleProperties(this.style)) res += ` style="${styleToString(this.style)}"`;
    return res;
  }
}

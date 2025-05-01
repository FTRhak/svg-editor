import { isNotUndefined } from '../utils';
import { TreeNodeModel } from './tree-node.model';
//import { SVGRootModel } from './svg-root.model';
//import { SVGDefsModel } from './svg-defs.model';
//import { SVGRectModel } from './svg-rect.model';

export class TreeNodeGradientModel extends TreeNodeModel {
  public id!: string;
  public gradientTransform: number = 0;

  constructor(params: Partial<TreeNodeGradientModel>) {
    super(params);

    if (isNotUndefined(params.id)) this.id = params.id as string;
    if (isNotUndefined(params.gradientTransform)) this.gradientTransform = params.gradientTransform as number;
  }

  public override clone(): TreeNodeGradientModel {
    const item = new TreeNodeGradientModel(this);
    return item;
  }
}

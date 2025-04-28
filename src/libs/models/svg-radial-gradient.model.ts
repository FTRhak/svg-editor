import { Generator } from '@libs/utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeModel } from './tree-node.model';

export class SVGRadialGradientModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.RADIAL_GRADIENT;
  public override readonly _id: PID;
  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGRadialGradientModel>) {
    super();
    this._id = Generator.getId('radialGradient-');
  }
}

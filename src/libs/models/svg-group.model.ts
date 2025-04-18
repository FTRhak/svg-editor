import { Generator } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeModel } from './tree-node.model';

export class SVGGroupModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.GROUP;
  public override readonly _id: PID;
  public transform!: string;
  public style!: string;

  public override children: SVGGroupModel[] = [];

  constructor() {
    super();
    this._id = Generator.getId('group-');
  }
}

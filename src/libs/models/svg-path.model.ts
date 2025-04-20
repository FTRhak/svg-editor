import { Generator } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { SVGGroupModel } from './svg-group.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGPathModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.PATH;
  public override readonly _id: PID;
  public transform!: string;
  public style!: string;
  public d!: string;

  public override children: SVGGroupModel[] = [];

  constructor() {
    super();
    this._id = Generator.getId('path-');
  }
}

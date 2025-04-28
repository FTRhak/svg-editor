import { Generator } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeModel } from './tree-node.model';

export class SVGDefsModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.DEFS;
  public override readonly _id: PID;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGDefsModel>) {
    super();
    this._id = Generator.getId('defs-');
  }

  public override render() {
    let res = `<defs>\n`;

    this.children.forEach((child) => (res += '  ' + child.render()));

    res += `</defs>\n`;
    return res;
  }

  public static override importFromDom(dom: SVGDefsElement) {
    const node = new SVGDefsModel({});
    return node;
  }
}

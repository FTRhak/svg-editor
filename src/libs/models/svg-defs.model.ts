import { Generator } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeGradientModel } from './tree-node-gradient.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGDefsModel extends TreeNodeModel {
  public override readonly _type = SVGNodeType.DEFS;
  public override readonly _id: PID;

  public override children: TreeNodeModel[] = [];

  public get gradients(): TreeNodeGradientModel[] {
    return this.children.filter(
      (item) => item._type === SVGNodeType.LINEAR_GRADIENT || item._type === SVGNodeType.RADIAL_GRADIENT,
    ) as TreeNodeGradientModel[];
  }

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

  public override resize(xCoefficient: number, yCoefficient: number): string[] {
    return [];
  }
}

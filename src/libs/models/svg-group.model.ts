import { Generator } from '../utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';

export class SVGGroupModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.GROUP;
  public override readonly _id: PID;

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGGroupModel>) {
    super(params);
    this._id = Generator.getId('group-');
  }

  public override render() {
    let res = `<g ` + this.renderPart() + `>\n`;

    this.children.forEach((child) => (res += '  ' + child.render()));

    res += `</g>\n`;
    return res;
  }

  public static override importFromDom(dom: SVGGElement) {
    const node = new SVGGroupModel({
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      transform: dom.getAttribute('transform')! || undefined,
    });

    return node;
  }
}

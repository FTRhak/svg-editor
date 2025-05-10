import { Generator, isNotUndefined } from '../utils';
import { pathStringToArray } from '../utils/path-convert.utils';
import { PID } from './id.type';
import { SVGNodeType } from './node.type';
import { SVGPathNodeModel } from './path-nodes/svg-path-node.model';
import { TreeNodeStyleModel } from './tree-node-style.model';
import { TreeNodeModel } from './tree-node.model';
import { VectorModel } from './vector.model';

export class SVGPathModel extends TreeNodeStyleModel {
  public override readonly _type = SVGNodeType.PATH;
  public override readonly _id: PID;

  private _d: SVGPathNodeModel[] = [];

  public set d(value: string) {
    this._d = pathStringToArray(value);
  }

  public get d(): string {
    const res = this._d.length > 0 ? this._d[0]?.render() : '';
    return res;
  }

  public get dArray(): SVGPathNodeModel[] {
    return this._d;
  }

  public override children: TreeNodeModel[] = [];

  constructor(params: Partial<SVGPathModel>) {
    super(params);
    this._id = Generator.getId('path-');
    if (isNotUndefined(params.d)) this.d = params.d as string;
  }

  public override render() {
    let res = `<path ` + this.renderPart() + (isNotUndefined(this.d) ? ` d="${this.d}"` : '') + `></path>\n`;
    return res;
  }

  public override moveShift(shift: VectorModel) {
    this._d.forEach((node) => node.moveShift(shift));
    return ['d'];
  }

  public override getMaxPoint(): VectorModel {
    const point = new VectorModel(0, 0);
    const points = this._d.map((node) => node.getMaxPoint());

    points.forEach((pointItem) => {
      if (point.x < pointItem.x) point.x = pointItem.x;
      if (point.y < pointItem.y) point.y = pointItem.y;
    });

    return point;
  }

  public override resize(xCoefficient: number, yCoefficient: number): void {
    this._d.forEach((node) => node.resize(xCoefficient, yCoefficient));
  }

  public static override importFromDom(dom: SVGPathElement) {
    const node = new SVGPathModel({
      d: dom.getAttribute('d')!,
      fill: dom.getAttribute('fill')! || undefined,
      stroke: dom.getAttribute('stroke')! || undefined,
      strokeWidth: dom.getAttribute('stroke-width') ? parseFloat(dom.getAttribute('stroke-width')!) : undefined,
      style: TreeNodeModel.importStyle(dom.style),
      transform: dom.getAttribute('transform')! || undefined,
    });

    return node;
  }
}

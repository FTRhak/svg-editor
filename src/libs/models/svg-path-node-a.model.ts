import { SVGPathNodeModel } from './svg-path-node.model';
import { SVGPathNodeType } from './svg-path-node.type';

export class SVGPathNodeAModel extends SVGPathNodeModel {
  public rx!: number;
  public ry!: number;
  public xAxisRotation!: number;
  public largeArcFlag!: number; // boolean
  public sweepFlag!: number; // boolean
  public x!: number;
  public y!: number;

  constructor(type: SVGPathNodeType, paramValues: string, prev: SVGPathNodeModel | undefined = undefined) {
    super(type, prev);

    const params = this.normalizeParams(paramValues, 7);
    console.log('A:', params);
    this.rx = parseFloat(params[0] || '0');
    this.ry = parseFloat(params[1] || '0');
    this.xAxisRotation = parseFloat(params[2] || '0');
    this.largeArcFlag = parseInt(params[3] || '0');
    this.sweepFlag = parseInt(params[4] || '0');
    this.x = parseFloat(params[5] || '0');
    this.y = parseFloat(params[6] || '0');
  }

  public override render(): string {
    return (
      `${this.type}${this.rx},${this.ry},${this.xAxisRotation},${this.largeArcFlag},${this.sweepFlag},${this.x},${this.y}` +
      (this._next ? this._next.render() : '')
    );
  }
}

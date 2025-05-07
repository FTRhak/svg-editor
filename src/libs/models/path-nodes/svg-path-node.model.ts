import { Generator } from '@libs/utils';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeModel {
  public readonly id: string;
  private readonly _type: SVGPathNodeType;
  private _isLocal: boolean = false;

  public get type(): SVGPathNodeType {
    return this._isLocal
      ? (this._type.toLowerCase() as SVGPathNodeType)
      : (this._type.toUpperCase() as SVGPathNodeType);
  }

  public get isLocal(): boolean {
    return this._isLocal;
  }

  protected _prev?: SVGPathNodeModel | undefined = undefined;
  protected _next?: SVGPathNodeModel | undefined = undefined;

  public get prev(): SVGPathNodeModel | undefined {
    return this._prev;
  }

  constructor(type: SVGPathNodeType, prev: SVGPathNodeModel | undefined = undefined) {
    this._type = type.toUpperCase() as SVGPathNodeType;
    this._isLocal = type === type.toLowerCase();
    this._prev = prev;

    this.id = Generator.getId('d-');
  }

  public setNext(node: SVGPathNodeModel): void {
    this._next = node;
  }

  public render(): string {
    return '';
  }

  protected normalizeParams(value: string, countItems: number): string[] {
    let params = value!.split(/[\s|\,]/gi);
    let paramsList: string[] = [];

    if (params.length < countItems) {
      params.forEach((el) => {
        if (el.lastIndexOf('-') > 0) {
          paramsList = paramsList.concat(el.split('-').map((el, index) => (index !== 0 ? '-' : '') + el));
        } else {
          paramsList.push(el);
        }
      });
    } else {
      paramsList = params;
    }

    return paramsList.filter((el) => el !== '');
  }

  public moveShift(shift: VectorModel): void {
    console.warn('Need to implement moveShift for SVGPathNodeModel');
  }
}

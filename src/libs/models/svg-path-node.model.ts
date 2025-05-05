import { Generator } from '@libs/utils';
import { SVGPathNodeType } from './svg-path-node.type';

export class SVGPathNodeModel {
  public readonly id: string;
  public readonly type: SVGPathNodeType;

  protected _prev?: SVGPathNodeModel | undefined = undefined;
  protected _next?: SVGPathNodeModel | undefined = undefined;

  public get prev(): SVGPathNodeModel | undefined {
    return this._prev;
  }

  constructor(type: SVGPathNodeType, prev: SVGPathNodeModel | undefined = undefined) {
    this.type = type;
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
    let params = value!.split(',');
    let paramsList: string[] = [];

    if (params.length < countItems) {
      params = params
        .reduce((ac: string[], cv) => {
          if (cv.lastIndexOf('-') > 0) {
            ac = ac.concat(cv.split('-').map((el, index) => (index !== 0 ? '-' : '') + el));
          } else {
            ac.push(cv);
          }

          return ac;
        }, [])
        .filter((el) => el !== '');
    } else {
      paramsList = params;
    }

    return paramsList;
  }
}

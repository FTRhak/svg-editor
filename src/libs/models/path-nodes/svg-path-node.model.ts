import { Generator } from '@libs/utils';
import { SVGPathNodeType } from '../svg-path-node.type';
import { VectorModel } from '../vector.model';

export class SVGPathNodeModel {
  public readonly id: string;
  protected readonly _type: SVGPathNodeType;
  protected _isLocal: boolean = false;

  public get type(): SVGPathNodeType {
    return this._isLocal
      ? (this._type.toLowerCase() as SVGPathNodeType)
      : (this._type.toUpperCase() as SVGPathNodeType);
  }

  public set type(type: SVGPathNodeType) {
    this._isLocal = type === type.toLowerCase();
  }

  public get typeAbsolute(): SVGPathNodeType {
    return this._type.toUpperCase() as SVGPathNodeType;
  }

  public set isLocal(value: boolean) {
    console.warn(`${this._type} isLocal value changed directly`);
    this._isLocal = value;
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

  public moveShift(shift: VectorModel): void {
    console.warn('Need to implement moveShift for SVGPathNodeModel');
  }
}

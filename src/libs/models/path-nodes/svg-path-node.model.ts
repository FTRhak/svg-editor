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

  public get prevNodeEndPosition(): SVGPathNodeModel | undefined {
    return this._prev;
  }

  public get getEndPosition(): VectorModel | undefined {
    return this._next?.getMaxPoint();
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

  public setPrev(node: SVGPathNodeModel): void {
    this._prev = node;
  }

  public render(): string {
    console.warn(`Need to implement render for SVGPathNodeModel ${this._type}`);
    return '';
  }

  public renderSelectionMoveArea(fill: string, stroke: string, strokeWidth: number, zoom: number = 1): string {
    console.warn(`Need to implement renderSelectionMoveArea for SVGPathNodeModel ${this._type}`);
    return '';
  }

  public moveShift(shift: VectorModel): void {
    console.warn(`Need to implement moveShift for SVGPathNodeModel ${this._type}`);
  }

  public getMaxPoint(): VectorModel {
    console.warn(`Need to implement getMaxPoint for SVGPathNodeModel ${this._type}`);
    return new VectorModel(0, 0);
  }

  public resize(xCoefficient: number, yCoefficient: number): void {
    console.warn(`Need to implement resize for SVGPathNodeModel ${this._type}`);
  }
}

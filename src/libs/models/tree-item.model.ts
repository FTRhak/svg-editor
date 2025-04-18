import { PID } from './id.type';
import { SVGNodeType } from './node.type';

export class TreeItem {
  public id: PID = '';
  public name: string = '';
  public typeName: string = '';
  children: TreeItem[] = [];

  public expanded = true;

  constructor(id: PID, type: SVGNodeType, name: string = '') {
    this.id = id;
    this.typeName = type;
    this.name = name;
  }
}

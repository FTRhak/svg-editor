import { PID } from './id.type';
import { SVGNodeType } from './node.type';

/**
 * Represents a node in a tree structure on Tree View panel
 */
export class TreeItem {
  public id: PID = '';
  public name: string = '';
  public typeName: string = '';
  public children: TreeItem[] = [];
  public canInsert: SVGNodeType[] = [];
  public expanded: boolean = true;

  constructor(id: PID, type: SVGNodeType, name: string = '', canInsert: SVGNodeType[] = []) {
    this.id = id;
    this.typeName = type;
    this.name = name;
    this.canInsert = canInsert;
  }
}

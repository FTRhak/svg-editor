import {
  SVGPathNodeAModel,
  SVGPathNodeCModel,
  SVGPathNodeHModel,
  SVGPathNodeLModel,
  SVGPathNodeMModel,
  SVGPathNodeModel,
  SVGPathNodeQModel,
  SVGPathNodeSModel,
  SVGPathNodeTModel,
  SVGPathNodeVModel,
  SVGPathNodeZModel,
} from '../models';
import { regPath, SVGPathNodeType } from '../models/svg-path-node.type';

export function pathStringToArray(path: string): SVGPathNodeModel[] {
  path = path.replaceAll('\n', '').replaceAll('\r', '').replaceAll('\t', '');

  let list = path.split(regPath).filter((el) => el !== '');
  let pathObj: SVGPathNodeModel[] = [];
  let i = 0;

  let prev: SVGPathNodeModel | undefined = undefined;
  let currentItem: SVGPathNodeModel | undefined = undefined;

  console.log('list:', list);
  while (list.length > i) {
    const item = list[i] as SVGPathNodeType;
    currentItem = undefined;
    if (item !== '') {
      switch (item.toLowerCase()) {
        case 'm':
          currentItem = new SVGPathNodeMModel(item as SVGPathNodeType, list[i + 1], prev);
          i++;
          break;
        //#region Line
        case 'l':
          currentItem = new SVGPathNodeLModel(item as SVGPathNodeType, list[i + 1], prev);
          i++;
          break;
        case 'h':
          currentItem = new SVGPathNodeHModel(item as SVGPathNodeType, list[i + 1], prev);
          i++;
          break;
        case 'v':
          currentItem = new SVGPathNodeVModel(item as SVGPathNodeType, list[i + 1], prev);
          i++;
          break;
        //#endregion

        //#region Cubic Bézier curve
        case 'c':
          currentItem = new SVGPathNodeCModel(item as SVGPathNodeType, list[i + 1], prev);
          i++;
          break;
        case 's':
          currentItem = new SVGPathNodeSModel(item as SVGPathNodeType, list[i + 1], prev);
          i++;
          break;
        //#endregion

        //#region Quadratic Bézier curve
        case 'q':
          currentItem = new SVGPathNodeQModel(item as SVGPathNodeType, list[i + 1], prev);
          i++;
          break;
        case 't':
          currentItem = new SVGPathNodeTModel(item as SVGPathNodeType, list[i + 1], prev);
          i++;
          break;
        //#endregion

        //#region Elliptical arc curve
        case 'a':
          currentItem = new SVGPathNodeAModel(item as SVGPathNodeType, list[i + 1], prev);
          i++;
          break;
        //#endregion

        case 'z':
          currentItem = new SVGPathNodeZModel(item as SVGPathNodeType, prev);
          i++;
          break;
        default:
          console.warn(`Parse path error [${item}]!`);
          break;
      }

      if (currentItem) {
        prev?.setNext(currentItem);
        pathObj.push(currentItem);
        prev = currentItem;
      }
    }

    i++;
  }

  return pathObj;
}

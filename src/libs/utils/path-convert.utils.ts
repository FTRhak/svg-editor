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

function normalizeParams(value: string): string[] {
  value = value.replace(/([-]{1})/gi, ' $1');
  let params = value!.split(/[\s|\,]/gi).filter((el) => el !== '');

  return params;
}

export function pathStringToArray(path: string): SVGPathNodeModel[] {
  let pathObj: SVGPathNodeModel[] = [];
  let prev: SVGPathNodeModel | undefined = undefined;
  let currentItem: SVGPathNodeModel | undefined = undefined;

  function createItem(
    item: SVGPathNodeType,
    classRef: any, // SVGPathNodeModel,
    params: string[],
    prev: SVGPathNodeModel | undefined = undefined,
  ) {
    if (params.length % classRef.ParamsCount === 0) {
      while (params.length >= classRef.ParamsCount) {
        const paramsPart = params.slice(0, classRef.ParamsCount);
        params = params.slice(classRef.ParamsCount);
        currentItem = new classRef(item as SVGPathNodeType, paramsPart, prev);

        append(currentItem);
      }
    } else {
      console.warn(`Parse path error [${item}]! Incorrect params count`);
    }
  }

  function append(currentItem: SVGPathNodeModel | undefined) {
    if (currentItem) {
      prev?.setNext(currentItem);
      pathObj.push(currentItem);
      prev = currentItem;
    }
  }

  path = path.replaceAll('\n', '').replaceAll('\r', '').replaceAll('\t', '');

  let list = path.split(regPath).filter((el) => el !== '');

  let i = 0;

  while (list.length > i) {
    const item = list[i] as SVGPathNodeType;
    currentItem = undefined;
    if (item !== '') {
      let params = list[i + 1] ? normalizeParams(list[i + 1]) : [];

      switch (item.toLowerCase()) {
        case 'm':
          currentItem = new SVGPathNodeMModel(item as SVGPathNodeType, params, prev);
          append(currentItem);
          i++;
          break;
        //#region Line
        case 'l':
          currentItem = new SVGPathNodeLModel(item as SVGPathNodeType, params, prev);
          append(currentItem);
          i++;
          break;
        case 'h':
          currentItem = new SVGPathNodeHModel(item as SVGPathNodeType, params, prev);
          append(currentItem);
          i++;
          break;
        case 'v':
          currentItem = new SVGPathNodeVModel(item as SVGPathNodeType, params, prev);
          append(currentItem);
          i++;
          break;
        //#endregion

        //#region Cubic Bézier curve
        case 'c':
          createItem(item, SVGPathNodeCModel, params, prev);
          i++;
          break;
        case 's':
          createItem(item, SVGPathNodeSModel, params, prev);
          i++;
          break;
        //#endregion

        //#region Quadratic Bézier curve
        case 'q':
          createItem(item, SVGPathNodeQModel, params, prev);
          i++;
          break;
        case 't':
          currentItem = new SVGPathNodeTModel(item as SVGPathNodeType, params, prev);
          append(currentItem);
          i++;
          break;
        //#endregion

        //#region Elliptical arc curve
        case 'a':
          createItem(item, SVGPathNodeAModel, params, prev);
          i++;
          break;
        //#endregion

        case 'z':
          currentItem = new SVGPathNodeZModel(item as SVGPathNodeType, prev);
          append(currentItem);
          break;
        default:
          console.warn(`Parse path error [${item}]!`);
          break;
      }
    }

    i++;
  }

  return pathObj;
}

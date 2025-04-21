import { StyleAttributeModel } from '../models';

export function styleToString(styles: StyleAttributeModel) {
  return Object.entries(styles)
    .map((el) => `${el[0]}: ${el[1]}`)
    .join('; ');
}

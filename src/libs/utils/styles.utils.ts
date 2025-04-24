import { StyleAttributeModel } from '../models';

/**
 * Converts a style object to a string of CSS styles.
 *
 * @param {StyleAttributeModel} styles - The style object to be converted.
 * @returns {string} A string of CSS styles.
 */
export function styleToString(styles: StyleAttributeModel): string {
  return styles
    ? Object.entries(styles)
        .map((el) => `${el[0]}: ${el[1]}`)
        .join('; ')
    : '';
}

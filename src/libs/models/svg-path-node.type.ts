export type SVGPathNodeType =
  | ''
  | 'm'
  | 'a'
  | 'h'
  | 'l'
  | 'v'
  | 'c'
  | 's'
  | 'q'
  | 't'
  | 'z'
  | 'A'
  | 'C'
  | 'H'
  | 'L'
  | 'M'
  | 'Q'
  | 'S'
  | 'T'
  | 'V'
  | 'Z';

export const regPath: RegExp = new RegExp(
  '(' + ['m', 'a', 'h', 'l', 'v', 'c', 's', 'q', 't', 'z'].join('|') + ')',
  'gi',
);

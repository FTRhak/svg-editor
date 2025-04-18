export function mapToArray<K = string, T = any>(map: Map<K, T>) {
  return Array.from(map);
}

export function mapToArrayValues<K = string, T = any>(map: Map<K, T>) {
  return Array.from(map).map(([key, item]) => item);
}

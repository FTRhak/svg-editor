export function randomRange(min: number, max: number) {
  return (Math.floor(Math.random() * 100 * max + Date.now()) % (max - min)) + min;
}

export class VectorModel {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public update(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

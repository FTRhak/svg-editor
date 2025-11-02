import { Injectable } from '@angular/core';
import { RectModel } from '@libs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Application {
  private readonly canvasRect = new BehaviorSubject<DOMRect | null>(null);
  public readonly canvasRect$ = this.canvasRect.asObservable();
  setCanvasRect(rect: DOMRect) {
    this.canvasRect.next(rect);
  }

  private readonly canvasViewBox = new BehaviorSubject<RectModel>(new RectModel());
  public readonly canvasViewBox$ = this.canvasViewBox.asObservable();
  setCanvasViewBox(rect: RectModel) {
    this.canvasViewBox.next(rect);
  }
}

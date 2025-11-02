import { Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Application } from '@core/services';
import { VectorModel } from '@libs';
import { map } from 'rxjs';
import { CanvasLineOrientation } from '../../models';

@Component({
  selector: 'canvas-line',
  standalone: false,
  templateUrl: './canvas-line.component.html',
  styleUrl: './canvas-line.component.scss',
})
export class CanvasLineComponent {
  private readonly app = inject(Application);

  public readonly orientation = input<CanvasLineOrientation>('horizontal');
  public readonly zoom = input.required<number>();
  public readonly center = input.required<VectorModel>();

  private readonly lineLength = toSignal(
    this.app.canvasRect$.pipe(
      map((rect) => (this.orientation() === 'horizontal' ? rect?.width || 0 : rect?.height || 0)),
    ),
    { initialValue: 0 },
  );
  public readonly sectionLength = signal<number>(0);

  public readonly lineShift = signal<number>(17);

  public lineData: number[] = [];

  constructor() {
    effect(() => {
      const zoom = this.zoom();
      const center = this.center();
      const lineLength = this.lineLength();

      console.log('line', zoom, center, lineLength);

      const shift = this.orientation() === 'horizontal' ? center.x : center.y;
      const physicalShift = shift / 10 / zoom * lineLength;

      let lineShift = (shift * lineLength * -1) / 10 / zoom;

      let sectionLength = lineLength / 10;
      while (sectionLength * 10 < lineLength) {
        sectionLength *= zoom;
      }

      console.log('sectionLength:', sectionLength);

      let indexShift = 0;
      while (lineShift > sectionLength) {
        indexShift++;
        lineShift -= sectionLength;
      }

      this.lineShift.set(lineShift);
      this.sectionLength.set(sectionLength);
      this.lineData = new Array(10).fill(0).map((_, index) => (index - indexShift) * zoom);
    });
  }
}

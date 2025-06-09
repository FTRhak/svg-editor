import { Component, DestroyRef, effect, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '@core/injectors';
import { VectorModel } from '@libs';
import { debounceTime, fromEvent, map } from 'rxjs';
import { CanvasLineOrientation } from '../../models';

@Component({
  selector: 'canvas-line',
  standalone: false,
  templateUrl: './canvas-line.component.html',
  styleUrl: './canvas-line.component.scss',
})
export class CanvasLineComponent implements OnInit {
  private readonly win = inject(WINDOW);
  private readonly destroyRef = inject(DestroyRef);

  public readonly orientation = input.required<CanvasLineOrientation>();
  public readonly zoom = input.required<number>();
  public readonly center = input.required<VectorModel>();

  private readonly lineLength = signal<number>(0);
  public readonly sectionLength = signal<number>(0);

  public readonly lineShift = signal<number>(17);

  public lineData: number[] = [];

  constructor() {
    effect(() => {
      const zoom = this.zoom();
      const center = this.center();
      const lineLength = this.lineLength();

      const shift = this.orientation() === 'horizontal' ? center.x : center.y;

      let lineShift = (shift * lineLength * -1) / 10 / zoom;

      let sectionLength = lineLength / 10;
      while (sectionLength * 10 < lineLength) {
        sectionLength *= zoom;
      }

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

  ngOnInit(): void {
    fromEvent(this.win, 'resize')
      .pipe(
        debounceTime(100),
        map(() => this.win.document.querySelector('canvas-panel')!.getBoundingClientRect()),
        map((rect) => (this.orientation() === 'horizontal' ? rect.width : rect.height)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((length) => {
        this.lineLength.set(length);
        console.log('EV:', length);
      });
  }
}

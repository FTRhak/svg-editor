import { AfterViewInit, Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '@core/injectors';
import { ProjectService } from '@core/services';
import { VectorModel } from '@libs';
import { filter, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';

type CanvasModes = 'drag' | 'edit';

@Component({
  selector: 'canvas-tools',
  standalone: false,
  templateUrl: './canvas-tools.component.html',
  styleUrl: './canvas-tools.component.scss',
})
export class CanvasToolsComponent implements AfterViewInit {
  private readonly win = inject(WINDOW);
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly svgCanvas = input.required<HTMLElement>({ alias: 'canvasRef' }); // SVGSVGElement

  public readonly zoom = input.required<number>();
  public readonly center = input.required<VectorModel>();

  value: CanvasModes = 'drag';

  paymentOptions: any[] = [
    { name: 'Drag Mode', value: 'drag', icon: 'pi pi-arrows-alt' },
    { name: 'Edit Mode', value: 'edit', icon: 'pi pi-pencil' },
  ];

  public ngAfterViewInit(): void {
    this.bindSelectItem();
    this.bindDragElement();
  }

  public onModeChanged() {}

  private bindSelectItem(): void {
    fromEvent<MouseEvent>(this.svgCanvas()!, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const id = (event.target as HTMLElement)?.getAttribute('id');
        if (id) {
          this.project.selectItem(id);
        }
      });
  }

  private bindDragElement(): void {
    const up$ = fromEvent(this.svgCanvas(), 'mouseup').pipe(takeUntilDestroyed(this.destroyRef));
    const start = new VectorModel();
    const zoom = this.zoom();
    fromEvent<MouseEvent>(this.svgCanvas()!, 'mousedown')
      .pipe(
        filter((ev) => (ev.target! as HTMLElement).tagName !== 'svg'),
        filter((ev) => ev.buttons === 1),
        switchMap((event: MouseEvent) => {
          start.x = event.clientX;
          start.y = event.clientY;
          return fromEvent<MouseEvent>(this.svgCanvas()!, 'mousemove').pipe(
            map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY })),
            takeUntil(up$),
            takeUntilDestroyed(this.destroyRef),
          );
        }),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ev) => {
        // TODO need to recalculate shift coefficients
        const coefficients = zoom / 100;
        this.project.dragMoveSelectedItem({ x: (ev.x - start.x) * coefficients, y: (ev.y - start.y) * coefficients });
        start.x = ev.x;
        start.y = ev.y;
      });
  }
}

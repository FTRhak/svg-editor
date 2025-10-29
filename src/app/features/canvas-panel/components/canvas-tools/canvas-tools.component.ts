import { AfterViewInit, Component, DestroyRef, effect, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '@core/injectors';
import { ProjectService } from '@core/services';
import { SVGRootModel, TreeNodeModel, VectorModel } from '@libs';
import { filter, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';

type CanvasModes = 'drag' | 'edit';

@Component({
  selector: 'canvas-tools',
  standalone: false,
  templateUrl: './canvas-tools.component.html',
  styleUrl: './canvas-tools.component.scss',
})
export class CanvasToolsComponent implements AfterViewInit, OnInit {
  private readonly win = inject(WINDOW);
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly svgCanvas = input.required<HTMLElement>({ alias: 'canvasRef' }); // SVGSVGElement

  public readonly zoom = input.required<number>();
  public readonly center = input.required<VectorModel>();

  private selectedEl: TreeNodeModel | null = null;

  private elRef: SVGGElement | null = null;

  value: CanvasModes = 'drag';

  paymentOptions: any[] = [
    { name: 'Drag Mode', value: 'drag', icon: 'pi pi-arrows-alt' },
    { name: 'Edit Mode', value: 'edit', icon: 'pi pi-pencil' },
  ];

  constructor() {
    const baseSize = 10;

    effect(() => {
      const zoom = this.zoom();
      this.renderItemSelection();
    });
  }

  public ngOnInit(): void {
    fromEvent<[SVGRootModel, TreeNodeModel]>(this.project.events, 'project:item:selected')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item]) => {
        this.elRef?.remove();
        this.selectedEl = item;

        this.renderItemSelection();
      });

    fromEvent<[SVGRootModel, TreeNodeModel, VectorModel]>(this.project.events, 'project:item:moved')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item, shift]) => {
        if (this.elRef && this.selectedEl) {
          this.renderItemSelection();
        }
      });

    fromEvent<[SVGRootModel, TreeNodeModel, VectorModel]>(this.project.events, 'project:item:transformed')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item, shift]) => {
        if (this.elRef && this.selectedEl) {
          this.renderItemSelection();
        }
      });
  }

  public ngAfterViewInit(): void {
    this.bindSelectItem();
    this.bindDragElement();
    this.bindTransformElement();
  }

  public onModeChanged() {
    if (this.value === 'drag') {
      this.renderItemSelection();
    }
  }

  private bindSelectItem(): void {
    fromEvent<MouseEvent>(this.svgCanvas()!, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const id = (event.target as HTMLElement)?.getAttribute('data-id');

        if (id) {
          this.project.selectItem(id);
        }
      });
  }

  private bindDragElement(): void {
    const parent = this.svgCanvas().parentElement!;

    const up$ = fromEvent(this.svgCanvas(), 'mouseup').pipe(takeUntilDestroyed(this.destroyRef));
    const canvasSize = new VectorModel(1, 1);
    const prev = new VectorModel();

    fromEvent<MouseEvent>(this.svgCanvas()!, 'mousedown')
      .pipe(
        filter(() => this.value === 'drag'),
        filter((ev) => (ev.target! as HTMLElement).tagName !== 'svg'),
        filter((ev) => ev.buttons === 1),
        tap(() => {
          const rec = parent.getBoundingClientRect();
          canvasSize.update(rec.width, rec.height);
        }),
        switchMap((event: MouseEvent) => {
          prev.update(event.clientX, event.clientY);

          return fromEvent<MouseEvent>(this.svgCanvas()!, 'mousemove').pipe(
            map((event: MouseEvent) => ({
              x: event.clientX,
              y: event.clientY,
              shiftKey: event.shiftKey,
              altKey: event.altKey,
              ctrlKey: event.ctrlKey,
            })),
            takeUntil(up$),
            takeUntilDestroyed(this.destroyRef),
          );
        }),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ev) => {
        // TODO need to recalculate shift coefficients
        this.moveItem({ x: ev.x - prev.x, y: ev.y - prev.y } as VectorModel, canvasSize, ev);

        prev.update(ev.x, ev.y);
      });
  }

  private moveItem(shift: VectorModel, canvasSize: VectorModel, ev: any): void {
    const zoom = this.zoom();
    let x = (shift.x / canvasSize.x) * zoom * 10;
    let y = (shift.y / canvasSize.x) * zoom * 10;
    // Move to project service
    if (ev.shiftKey) {
      x = Math.round(x * 100) / 100;
      y = Math.round(y * 100) / 100;
    }
    this.project.dragMoveSelectedItem({
      x: x,
      y: y,
    } as VectorModel);
  }

  private bindTransformElement(): void {
    const up$ = fromEvent(this.svgCanvas(), 'mouseup').pipe(takeUntilDestroyed(this.destroyRef));
    const prev = new VectorModel();
    const zoom = this.zoom();
    fromEvent<MouseEvent>(this.svgCanvas()!, 'mousedown')
      .pipe(
        filter(() => this.value === 'edit'),
        filter((ev: MouseEvent) => (ev.target! as HTMLElement).hasAttribute('data-action')),
        filter((ev: MouseEvent) => ev.buttons === 1),
        switchMap((event: MouseEvent) => {
          prev.update(event.clientX, event.clientY);

          const action = (event.target! as HTMLElement).getAttribute('data-action') as string;
          const actionParam = (event.target! as HTMLElement).getAttribute(`data-${action}`) as string;

          return fromEvent<MouseEvent>(this.svgCanvas()!, 'mousemove').pipe(
            map((event: MouseEvent) => ({
              x: event.clientX,
              y: event.clientY,
              action,
              param: actionParam ? actionParam.split('_') : [],
            })),
            takeUntil(up$),
            takeUntilDestroyed(this.destroyRef),
          );
        }),
      )
      .pipe(filter((ev) => ev.param.length > 0))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ev) => {
        console.log(ev);

        const coefficients = zoom / 100;
        this.project.transformSelectedItem(ev.action, ev.param, {
          x: (ev.x - prev.x) * coefficients,
          y: (ev.y - prev.y) * coefficients,
        } as VectorModel);

        prev.update(ev.x, ev.y);
      });
  }

  private transformItem(shift: VectorModel, canvasSize: VectorModel) {}

  private renderItemSelection() {
    this.elRef?.remove();
    if (this.selectedEl) {
      const zoom = this.zoom();
      const container = this.svgCanvas();
      const domSelectedEl = container?.querySelector(`[data-id="${this.selectedEl._id}"]`);

      this.elRef = this.win.document.createElementNS('http://www.w3.org/2000/svg', 'g');
      this.elRef.setAttribute('id', 'selection-highlight');

      this.elRef.innerHTML = this.selectedEl?.renderSelectionMoveArea(
        'rgba(203,203,203,0.3)',
        'red',
        zoom * 0.005,
        zoom * 0.1,
      );

      domSelectedEl?.parentElement?.appendChild(this.elRef);
    }
  }
}

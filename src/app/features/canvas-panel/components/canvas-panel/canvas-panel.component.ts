import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '@core/injectors';
import { Application, ProjectService } from '@core/services';
import { RectModel, SVGNodeType, SVGRootModel, TreeNodeModel, VectorModel } from '@libs';
import { debounceTime, filter, fromEvent, map, merge, switchMap, takeUntil, tap } from 'rxjs';

const normalizePropertyName = (str: string) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

@Component({
  selector: 'canvas-panel',
  standalone: false,
  templateUrl: './canvas-panel.component.html',
  styleUrl: './canvas-panel.component.scss',
})
export class CanvasPanelComponent implements OnInit, AfterViewInit {
  private readonly win = inject(WINDOW);
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);
  private readonly el = inject(ElementRef);
  private readonly render = inject(Renderer2);
  private readonly app = inject(Application);

  private readonly SVG_BORDER = 0.02;
  private readonly SVG_GRID_LINE = 0.01;

  private readonly svgCanvas = viewChild<ElementRef<SVGSVGElement>>('svgCanvasRef');
  private readonly svgGridView = viewChild<ElementRef<SVGGElement>>('gridList');
  private readonly svgBgView = viewChild<ElementRef<SVGGElement>>('svgBgView');

  width = signal<number>(1);
  height = signal<number>(1);

  center = signal<VectorModel>({ x: 0, y: 0 } as VectorModel);
  zoom = signal<number>(1);
  //view!: RectModel;

  constructor() {
    const baseSize = 10;

    effect(() => {
      const width = this.width();
      const height = this.height();
      const zoom = this.zoom();
      const center = this.center();

      const svgBorder = this.SVG_BORDER * zoom;
      const rec = new RectModel(center.x, center.y, baseSize * zoom, baseSize * (height / width) * zoom);

      this.app.setCanvasViewBox(rec);

      //this.svgCanvas()?.nativeElement.setAttribute('viewBox', `${rec.x} ${rec.y} ${rec.width} ${rec.height}`);
      this.svgBgView()
        ?.nativeElement.querySelector('[data-id="borderSVGZone"]')
        ?.setAttribute('stroke-width', `${svgBorder}`);
    });
  }

  ngOnInit(): void {
    fromEvent<[SVGRootModel, TreeNodeModel[]]>(this.project.events, 'project:tree:updates')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item]) => {
        this.renderSVG(project, this.svgBgView()!.nativeElement);
      });

    fromEvent<[SVGRootModel, TreeNodeModel, string, any]>(this.project.events, 'project:item:updated')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item, propertyName, value]) => {
        this.updateSVGNode(item, propertyName, value);
      });

    this.app.canvasViewBox$.pipe(debounceTime(0), takeUntilDestroyed(this.destroyRef)).subscribe((rec) => {
      this.svgCanvas()?.nativeElement.setAttribute('viewBox', `${rec.x} ${rec.y} ${rec.width} ${rec.height}`);
    });
  }

  public ngAfterViewInit(): void {
    this.bindMouseWheel_Zoom();
    this.bindResizeCanvas();
    this.bindDragCanvas();
  }

  public onFitCanvas() {
    const rect = this.project.getBoundingItemRect();

    //this.center.set(new VectorModel(rect.x, rect.y));
    this.zoom.set(1);
  }

  public onZoomChanged(zoomValue: number) {
    this.zoom.update((value) => value * zoomValue);
  }

  private bindMouseWheel_Zoom() {
    fromEvent<WheelEvent>(this.svgCanvas()?.nativeElement!, 'wheel')
      .pipe(
        filter((ev) => !(ev.ctrlKey || ev.buttons === 1 || ev.buttons === 2)),
        map((ev) => ev.deltaY / Math.abs(ev.deltaY)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.zoom.update((value) => value * (event < 0 ? 0.5 : 2));
      });
  }

  private bindResizeCanvas() {
    fromEvent(this.win, 'resize')
      .pipe(
        debounceTime(100),
        map(() => this.el.nativeElement.parentElement.getBoundingClientRect()),
        map((rect) => ({ width: rect.width, height: rect.height })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.width.set(event.width);
        this.height.set(event.height);
        this.el.nativeElement.style.width = `${event.width}px`;
        this.el.nativeElement.style.height = `${event.height}px`;
        this.svgCanvas()!.nativeElement.setAttribute('width', `${event.width}px`);
        this.svgCanvas()!.nativeElement.setAttribute('height', `${event.height}px`);

        this.app.setCanvasRect(this.svgCanvas()!.nativeElement.getBoundingClientRect());
      });

    this.win.dispatchEvent(new Event('resize'));
  }

  private bindDragCanvas() {
    const targetCanvas = this.svgCanvas()!.nativeElement;
    const parent = targetCanvas.parentElement!;

    const up$ = merge(fromEvent(targetCanvas, 'mouseup'), fromEvent(targetCanvas, 'mouseleave')).pipe(
      takeUntilDestroyed(this.destroyRef),
    );

    const canvasSize = new VectorModel(1, 1);
    const prev = new VectorModel();

    fromEvent<MouseEvent>(targetCanvas, 'mousedown')
      .pipe(
        filter((ev) => (ev.target! as HTMLElement).tagName === 'svg'),
        filter((ev) => ev.buttons === 1),
        tap(() => {
          const rec = parent.getBoundingClientRect();
          canvasSize.update(rec.width, rec.height);
        }),
        switchMap((event: MouseEvent) => {
          prev.update(event.clientX, event.clientY);
          return fromEvent<MouseEvent>(targetCanvas, 'mousemove').pipe(
            map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY })),
            takeUntil(up$),
            takeUntilDestroyed(this.destroyRef),
          );
        }),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ev) => {
        this.drag({ x: ev.x - prev.x, y: ev.y - prev.y } as VectorModel, canvasSize);
        prev.update(ev.x, ev.y);
      });
  }

  private drag(shift: VectorModel, canvasSize: VectorModel) {
    const zoom = this.zoom();
    const center = this.center();
    this.center.set({
      x: center.x - (shift.x / canvasSize.x) * zoom * 10,
      y: center.y - (shift.y / canvasSize.x) * zoom * 10,
    } as VectorModel);
  }

  private renderSVG(svg: SVGRootModel, rootNode: SVGGElement): void {
    if (rootNode) {
      const svgBorder = this.SVG_BORDER * this.zoom();
      let res = '';
      rootNode.innerHTML = '';

      res += `<rect id="${svg._id}" data-id="borderSVGZone" x="${svg.viewBox!.x}" y="${svg.viewBox!.y}" width="${svg.viewBox!.width}" height="${svg.viewBox!.height}" fill="none" stroke="black" stroke-width="${svgBorder}"></rect>\n`;
      svg.children.forEach((item) => {
        res += item.render() + '\n';
      });

      rootNode.innerHTML = res;
    }
  }

  private updateSVGNode(item: TreeNodeModel, propertyName: string, value: any) {
    const target = this.el.nativeElement.querySelector(`[data-id="${item._id}"]`);
    if (target) {
      if (item._type === SVGNodeType.TEXT && propertyName === 'text') {
        const text = this.render.createText(value);
        target.innerHTML = '';
        this.render.appendChild(target, text);
      } else {
        this.render.setAttribute(target, normalizePropertyName(propertyName), value);
        //target?.setAttribute(normalizePropertyName(propertyName), value);
      }
    }
  }
}

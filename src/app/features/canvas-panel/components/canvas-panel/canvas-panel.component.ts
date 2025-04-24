import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '@core/injectors';
import { ProjectService } from '@core/services';
import { RectModel, SVGRootModel, TreeNodeModel, VectorModel } from '@libs';
import { debounceTime, filter, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';

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

  private readonly SVG_BORDER = 0.02;
  private readonly SVG_GRID_LINE = 0.01;

  private readonly svgCanvas = viewChild<ElementRef<SVGSVGElement>>('svgCanvasRef');
  private readonly svgGridView = viewChild<ElementRef<SVGGElement>>('gridList');
  private readonly svgBgView = viewChild<ElementRef<SVGGElement>>('svgBgView');

  width = signal<number>(1);
  height = signal<number>(1);

  center = signal<VectorModel>({ x: 0, y: 0 });
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
      const rec = new RectModel(
        center.x * zoom,
        center.y * zoom,
        baseSize * zoom - center.x,
        baseSize * (height / width) * zoom - center.y,
      );

      this.svgCanvas()?.nativeElement.setAttribute('viewBox', `${rec.x} ${rec.y} ${rec.width} ${rec.height}`);
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
  }

  ngAfterViewInit(): void {
    this.bindMouseWheel_Zoom();
    this.bindResizeCanvas();
    this.bindDragCanvas();
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
      });

    this.win.dispatchEvent(new Event('resize'));
  }

  private bindDragCanvas() {
    const up$ = fromEvent(this.svgCanvas()?.nativeElement!, 'mouseup').pipe(takeUntilDestroyed(this.destroyRef));
    const start = new VectorModel();
    const startCenter = new VectorModel();
    const zoom = this.zoom();
    fromEvent<MouseEvent>(this.svgCanvas()?.nativeElement!, 'mousedown')
      .pipe(
        filter((ev) => (ev.target! as HTMLElement).tagName === 'svg'),
        filter((ev) => ev.buttons === 1),
        switchMap((event: MouseEvent) => {
          start.x = event.clientX;
          start.y = event.clientY;
          startCenter.x = this.center().x;
          startCenter.y = this.center().y;
          return fromEvent<MouseEvent>(this.svgCanvas()?.nativeElement!, 'mousemove').pipe(
            //debounceTime(10),
            map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY })),
            takeUntil(up$),
            takeUntilDestroyed(this.destroyRef),
          );
        }),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ev) => {
        this.center.set({
          x: startCenter.x - ((ev.x - start.x) * zoom) / 100,
          y: startCenter.y - ((ev.y - start.y) * zoom) / 100,
        });
      });
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
      console.log(res);
      rootNode.innerHTML = res;
    }
  }

  private updateSVGNode(item: TreeNodeModel, propertyName: string, value: any) {
    this.el.nativeElement.querySelector(`#${item._id}`)?.setAttribute(normalizePropertyName(propertyName), value);
  }
}

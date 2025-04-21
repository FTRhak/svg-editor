import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '@core/injectors';
import { ProjectService } from '@core/services';
import { SVGRootModel, TreeNodeModel } from '@libs';
import { debounceTime, fromEvent, map } from 'rxjs';

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
  private el = inject(ElementRef);

  svgCanvas = viewChild<ElementRef<SVGElement>>('svgCanvas');
  svgBgView = viewChild<ElementRef<SVGGElement>>('svgBgView');

  width = signal<number>(0);
  height = signal<number>(0);

  zoom = signal<number>(1);

  ngOnInit(): void {
    fromEvent<[SVGRootModel, TreeNodeModel[]]>(this.project.events, 'project:tree:updates')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item]) => {
        this.renderSVG(project, this.svgBgView()!.nativeElement);
      });

    /*fromEvent<[SVGRootModel, TreeNodeModel]>(this.project.events, 'project:item:selected')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item]) => {});*/
  }

  ngAfterViewInit(): void {
    fromEvent<WheelEvent>(this.win, 'wheel')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {});

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

  private renderSVG(svg: SVGRootModel, rootNode: SVGGElement): void {
    if (rootNode) {
      rootNode.innerHTML = '';
      let res = '';
      svg.children.forEach((item) => {
        res += item.render();
      });
      console.log(res);
      rootNode.innerHTML = res;
    }
  }
}

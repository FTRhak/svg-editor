import { DestroyRef, Directive, ElementRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '@core/injectors';
import { ProjectService } from '@core/services';
import { SVGNodeType, SVGRectModel, SVGRootModel, TreeNodeModel } from '@libs';
import { collectionToArray } from '@libs/utils';
import { debounceTime, fromEvent } from 'rxjs';

@Directive({
  selector: '[canvasManualEdit]',
  standalone: false,
})
export class CanvasManualEditDirective implements OnInit {
  private readonly win = inject(WINDOW);
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);
  private el: ElementRef<SVGGElement> = inject(ElementRef<SVGGElement>);

  public zoom = input.required<number, number>({
    alias: 'canvasManualEdit',
    transform: (value) => {
      this.updateEditElements(value);
      return value;
    },
  });

  private item!: TreeNodeModel;

  ngOnInit(): void {
    fromEvent<[SVGRootModel, TreeNodeModel]>(this.project.events, 'project:item:selected')
      .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item]) => {
        this.item = item;
        this.renderEditElements();
      });
  }

  private renderEditElements() {
    this.el.nativeElement.innerHTML = '';
    if (this.item && this.item._type === SVGNodeType.RECT) {
      this.renderEditRect(this.item as SVGRectModel);
    }
  }

  private updateEditElements(zoom: number): void {
    collectionToArray(this.el.nativeElement.children).forEach((item: HTMLElement) => {
      if (item.hasAttribute('r')) {
        item.setAttribute('r', `${zoom * 0.1}`);
      }
    });
  }

  private renderEditRect(rect: SVGRectModel): void {
    const zoom = this.zoom();
    const anchors = rect
      .anchorPoints()
      .map((item) => `<circle cx="${item.x}" cy="${item.y}" r="${zoom * 0.1}" fill="red" />`)
      .join('');
    this.el.nativeElement.innerHTML = anchors;
  }
}

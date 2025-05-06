import { DestroyRef, Directive, effect, ElementRef, inject, input } from '@angular/core';
import { VectorModel } from '@libs';
import { collectionToArray } from '@libs/utils';

@Directive({
  selector: '[canvasGridRender]',
  standalone: false,
})
export class CanvasGridRenderDirective {
  private readonly destroyRef = inject(DestroyRef);
  private el: ElementRef<SVGGElement> = inject(ElementRef<SVGGElement>);

  private readonly SVG_GRID_LINE = 0.01;

  public readonly zoom = input.required<number>();
  public readonly center = input.required<VectorModel>();

  private rendered = false;

  constructor() {
    let zoom: number = 1;
    let center: VectorModel = { x: 0, y: 0 } as VectorModel;
    effect(() => {
      zoom = this.zoom();
      console.log('ZOOM:', zoom);
      //this.rendered ? this.gridUpdate(zoom, center) : this.gridRender(zoom, center);
      this.gridRender(zoom, center);
    });

    effect(() => {
      center = this.center();
      this.rendered ? this.gridUpdate(zoom, center) : this.gridRender(zoom, center);
    });
  }

  private gridRender(zoom: number, center: VectorModel) {
    const gridLineWidth = this.SVG_GRID_LINE * zoom;
    const gridAxeLineWidth = this.SVG_GRID_LINE * zoom * 3;

    let horizontalLines = '';
    let verticalLines = '';

    const gridStep = Math.floor(zoom / 2) + 1;
    //console.log('gridRender:', gridStep);

    horizontalLines += `<line data-type="axe" class="grid-line" x1="0" y1="-100" x2="0" y2="100" stroke-width="${gridAxeLineWidth}"></line>`;
    for (let i = gridStep; i < 100; i += gridStep) {
      horizontalLines += `<line data-type="axe-grid" class="grid-line" x1="${i}" y1="-100" x2="${i}" y2="100" stroke-width="${gridLineWidth}"></line>`;
      horizontalLines += `<line data-type="axe-grid" class="grid-line" x1="${-i}" y1="-100" x2="${-i}" y2="100" stroke-width="${gridLineWidth}"></line>`;
    }

    verticalLines += `<line data-type="axe" class="grid-line" x1="-100" y1="0" x2="100" y2="0" stroke-width="${gridAxeLineWidth}"></line>`;
    for (let i = gridStep; i < 100; i += gridStep) {
      verticalLines += `<line data-type="axe-grid" class="grid-line" x1="-100" y1="${i}" x2="100" y2="${i}" stroke-width="${gridLineWidth}"></line>`;
      verticalLines += `<line data-type="axe-grid" class="grid-line" x1="-100" y1="${-i}" x2="100" y2="${-i}" stroke-width="${gridLineWidth}"></line>`;
    }

    this.el.nativeElement.innerHTML = `<g data-type="grid-horizontal">${horizontalLines}</g><g data-type="grid-vertical">${verticalLines}</g>`;
    this.rendered = true;
  }

  private gridUpdate(zoom: number, center: VectorModel) {
    //console.log('gridUpdate:', zoom);
    const gridLineWidth = this.SVG_GRID_LINE * zoom;
    const gridAxeLineWidth = this.SVG_GRID_LINE * zoom * 3;

    //#region update lines stroke-width
    collectionToArray(this.el.nativeElement.querySelectorAll('line[data-type="axe-grid"]')).forEach((line) => {
      line.setAttribute('stroke-width', `${gridLineWidth}`);
    });

    collectionToArray(this.el.nativeElement.querySelectorAll('line[data-type="axe"]')).forEach((line) => {
      line.setAttribute('stroke-width', `${gridAxeLineWidth}`);
    });
    //#endregion

    // TODO need to recalculate start/end greed lines positions
  }
}

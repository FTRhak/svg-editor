import { DestroyRef, Directive, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '@core/injectors';
import { ProjectService } from '@core/services';
import { SVGNodeType, SVGRootModel, TreeNodeModel } from '@libs';
import { debounceTime, fromEvent } from 'rxjs';

@Directive({
  selector: '[canvasManualEdit]',
  standalone: false,
})
export class CanvasManualEditDirective implements OnInit {
  private readonly win = inject(WINDOW);
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);
  private el = inject(ElementRef);

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
    console.log(this.item);
    if (this.item._type === SVGNodeType.RECT) {
    }
  }
}

import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PID, SVGPathNodeMModel, SVGPathNodeModel } from '@libs';
import { PathNodesDPropertyModel } from '../path-nodes-d-property.model';

@Component({
  selector: 'path-nodes-m',
  standalone: false,
  templateUrl: './path-nodes-m.component.html',
  styleUrl: './path-nodes-m.component.scss',
})
export class PathNodesMComponent extends PathNodesDPropertyModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);

  public readonly pathId = input.required<PID>();
  public override node = input.required<SVGPathNodeMModel | SVGPathNodeModel>();
  public readonly x = input.required<number>();
  public readonly y = input.required<number>();

  public override readonly changeNode = output<[PID, string, any]>();

  constructor() {
    super();
    effect(() => {
      const x = this.x();
      const y = this.y();
      this.form.get('x')?.setValue(x, { emitEvent: false });
      this.form.get('y')?.setValue(y, { emitEvent: false });
    });
  }

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeMModel;

    this.form = new FormGroup({
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });

    this.bindPropertyChanged();

    /*fromEvent<[SVGRootModel, TreeNodeModel, SVGPathNodeModel, string, any]>(
      this.project.events,
      'project:item-path:updated',
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item, pathNode, propertyName, value]) => {
        // TODO
        //console.log('==CH:', project, item, pathNode, propertyName, value);
        //this.form.setValue({ ...this.form.getRawValue(), [propertyName]: value } as any, { emitEvent: false });
      });*/
  }
}

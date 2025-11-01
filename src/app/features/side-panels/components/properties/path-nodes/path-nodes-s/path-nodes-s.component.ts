import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { PID, SVGPathNodeModel, SVGPathNodeSModel } from '@libs';
import { PathNodesDPropertyModel } from '../path-nodes-d-property.model';

@Component({
  selector: 'path-nodes-s',
  standalone: false,
  templateUrl: './path-nodes-s.component.html',
  styleUrl: './path-nodes-s.component.scss',
})
export class PathNodesSComponent extends PathNodesDPropertyModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);

  public readonly pathId = input.required<PID>();
  public override node = input.required<SVGPathNodeSModel | SVGPathNodeModel>();
  public readonly x = input.required<number>();
  public readonly y = input.required<number>();
  public readonly x2 = input.required<number>();
  public readonly y2 = input.required<number>();

  public override readonly changeNode = output<[PID, string, any]>();

  constructor() {
    super();
    effect(() => {
      const x = this.x();
      const y = this.y();
      const x2 = this.x2();
      const y2 = this.y2();
      this.form.get('x')?.setValue(x, { emitEvent: false });
      this.form.get('y')?.setValue(y, { emitEvent: false });
      this.form.get('x2')?.setValue(x2, { emitEvent: false });
      this.form.get('y2')?.setValue(y2, { emitEvent: false });
    });
  }

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeSModel;

    this.form = new FormGroup({
      x2: new FormControl({ value: node.x2 || 0, disabled: false }),
      y2: new FormControl({ value: node.y2 || 0, disabled: false }),
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });

    this.bindPropertyChanged();
  }
}

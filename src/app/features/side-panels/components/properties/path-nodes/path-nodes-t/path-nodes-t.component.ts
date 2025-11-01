import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PID, SVGPathNodeModel, SVGPathNodeTModel } from '@libs';
import { PathNodesDPropertyModel } from '../path-nodes-d-property.model';

@Component({
  selector: 'path-nodes-t',
  standalone: false,
  templateUrl: './path-nodes-t.component.html',
  styleUrl: './path-nodes-t.component.scss',
})
export class PathNodesTComponent extends PathNodesDPropertyModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);

  public readonly pathId = input.required<PID>();
  public override node = input.required<SVGPathNodeTModel | SVGPathNodeModel>();
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
    const node = this.node() as SVGPathNodeTModel;

    this.form = new FormGroup({
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });

    this.bindPropertyChanged();
  }
}

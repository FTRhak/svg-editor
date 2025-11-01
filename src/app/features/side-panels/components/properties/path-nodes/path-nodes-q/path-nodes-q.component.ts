import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PID, SVGPathNodeModel, SVGPathNodeQModel } from '@libs';
import { PathNodesDPropertyModel } from '../path-nodes-d-property.model';

@Component({
  selector: 'path-nodes-q',
  standalone: false,
  templateUrl: './path-nodes-q.component.html',
  styleUrl: './path-nodes-q.component.scss',
})
export class PathNodesQComponent extends PathNodesDPropertyModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);

  public readonly pathId = input.required<PID>();
  public override node = input.required<SVGPathNodeQModel | SVGPathNodeModel>();
  public readonly x = input.required<number>();
  public readonly y = input.required<number>();
  public readonly x1 = input.required<number>();
  public readonly y1 = input.required<number>();

  public override readonly changeNode = output<[PID, string, any]>();

  constructor() {
    super();
    effect(() => {
      const x = this.x();
      const y = this.y();
      const x1 = this.x1();
      const y1 = this.y1();
      this.form.get('x')?.setValue(x, { emitEvent: false });
      this.form.get('y')?.setValue(y, { emitEvent: false });
      this.form.get('x1')?.setValue(x1, { emitEvent: false });
      this.form.get('y1')?.setValue(y1, { emitEvent: false });
    });
  }

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeQModel;

    this.form = new FormGroup({
      x1: new FormControl({ value: node.x1 || 0, disabled: false }),
      y1: new FormControl({ value: node.y1 || 0, disabled: false }),
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });

    this.bindPropertyChanged();
  }
}

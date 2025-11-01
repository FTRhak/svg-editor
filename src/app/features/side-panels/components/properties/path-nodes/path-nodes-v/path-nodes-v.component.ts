import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PID, SVGPathNodeModel, SVGPathNodeVModel } from '@libs';
import { PathNodesDPropertyModel } from '../path-nodes-d-property.model';

@Component({
  selector: 'path-nodes-v',
  standalone: false,
  templateUrl: './path-nodes-v.component.html',
  styleUrl: './path-nodes-v.component.scss',
})
export class PathNodesVComponent extends PathNodesDPropertyModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);

  public readonly pathId = input.required<PID>();
  public override node = input.required<SVGPathNodeVModel | SVGPathNodeModel>();
  public readonly y = input.required<number>();

  public override readonly changeNode = output<[PID, string, any]>();

  constructor() {
    super();
    effect(() => {
      const y = this.y();
      this.form.get('y')?.setValue(y, { emitEvent: false });
    });
  }

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeVModel;

    this.form = new FormGroup({
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });

    this.bindPropertyChanged();
  }
}

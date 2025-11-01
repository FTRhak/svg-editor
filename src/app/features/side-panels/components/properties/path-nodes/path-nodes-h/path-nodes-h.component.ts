import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PID, SVGPathNodeHModel, SVGPathNodeModel } from '@libs';
import { PathNodesDPropertyModel } from '../path-nodes-d-property.model';

@Component({
  selector: 'path-nodes-h',
  standalone: false,
  templateUrl: './path-nodes-h.component.html',
  styleUrl: './path-nodes-h.component.scss',
})
export class PathNodesHComponent extends PathNodesDPropertyModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);

  public readonly pathId = input.required<PID>();
  public override node = input.required<SVGPathNodeHModel | SVGPathNodeModel>();
  public readonly x = input.required<number>();

  public override readonly changeNode = output<[PID, string, any]>();

  constructor() {
    super();
    effect(() => {
      const x = this.x();
      this.form.get('x')?.setValue(x, { emitEvent: false });
    });
  }

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeHModel;

    this.form = new FormGroup({
      x: new FormControl({ value: node.x || 0, disabled: false }),
    });

    this.bindPropertyChanged();
  }
}

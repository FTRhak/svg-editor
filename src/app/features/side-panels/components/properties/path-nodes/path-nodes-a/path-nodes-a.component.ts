import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PID, SVGPathNodeAModel, SVGPathNodeModel } from '@libs';
import { PathNodesDPropertyModel } from '../path-nodes-d-property.model';

@Component({
  selector: 'path-nodes-a',
  standalone: false,
  templateUrl: './path-nodes-a.component.html',
  styleUrl: './path-nodes-a.component.scss',
})
export class PathNodesAComponent extends PathNodesDPropertyModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);

  public readonly pathId = input.required<PID>();
  public override node = input.required<SVGPathNodeAModel | SVGPathNodeModel>();
  public readonly rx = input.required<number>();
  public readonly ry = input.required<number>();
  public readonly xAxisRotation = input.required<number>();
  public readonly largeArcFlag = input.required<number>();
  public readonly sweepFlag = input.required<number>();
  public readonly x = input.required<number>();
  public readonly y = input.required<number>();

  public override readonly changeNode = output<[PID, string, any]>();

  constructor() {
    super();
    effect(() => {
      const rx = this.rx();
      const ry = this.ry();
      const xAxisRotation = this.xAxisRotation() ? true : false;
      const largeArcFlag = this.largeArcFlag() ? true : false;
      const sweepFlag = this.sweepFlag() ? true : false;
      const x = this.x();
      const y = this.y();

      this.form.get('rx')?.setValue(rx, { emitEvent: false });
      this.form.get('ry')?.setValue(ry, { emitEvent: false });
      this.form.get('xAxisRotation')?.setValue(xAxisRotation, { emitEvent: false });
      this.form.get('largeArcFlag')?.setValue(largeArcFlag, { emitEvent: false });
      this.form.get('sweepFlag')?.setValue(sweepFlag, { emitEvent: false });
      this.form.get('x')?.setValue(x, { emitEvent: false });
      this.form.get('y')?.setValue(y, { emitEvent: false });
    });
  }

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeAModel;

    this.form = new FormGroup({
      rx: new FormControl({ value: node.rx || 0, disabled: false }),
      ry: new FormControl({ value: node.ry || 0, disabled: false }),
      // TODO does not work
      xAxisRotation: new FormControl({ value: !!node.xAxisRotation, disabled: false }),
      largeArcFlag: new FormControl({ value: !!node.largeArcFlag, disabled: false }),
      sweepFlag: new FormControl({ value: !!node.sweepFlag, disabled: false }),
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });

    this.bindPropertyChanged();
  }

  protected override valueOutputTransform(property: string, value: any) {
    console.log(property, value);
    return value || 0;
  }
}

import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SVGPathNodeAModel, SVGPathNodeModel } from '@libs';

@Component({
  selector: 'path-nodes-a',
  standalone: false,
  templateUrl: './path-nodes-a.component.html',
  styleUrl: './path-nodes-a.component.scss',
})
export class PathNodesAComponent {
  public node = input.required<SVGPathNodeAModel | SVGPathNodeModel>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeAModel;

    this.form = new FormGroup({
      rx: new FormControl({ value: node.rx || 0, disabled: false }),
      ry: new FormControl({ value: node.ry || 0, disabled: false }),
      xAxisRotation: new FormControl({ value: node.xAxisRotation || 0, disabled: false }),
      largeArcFlag: new FormControl({ value: node.largeArcFlag || 0, disabled: false }),
      sweepFlag: new FormControl({ value: node.sweepFlag || 0, disabled: false }),
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }
}

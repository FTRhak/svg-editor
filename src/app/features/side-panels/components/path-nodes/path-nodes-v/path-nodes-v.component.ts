import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SVGPathNodeModel, SVGPathNodeVModel } from '@libs';

@Component({
  selector: 'path-nodes-v',
  standalone: false,
  templateUrl: './path-nodes-v.component.html',
  styleUrl: './path-nodes-v.component.scss',
})
export class PathNodesVComponent {
  public node = input.required<SVGPathNodeVModel | SVGPathNodeModel>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeVModel;

    this.form = new FormGroup({
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }
}

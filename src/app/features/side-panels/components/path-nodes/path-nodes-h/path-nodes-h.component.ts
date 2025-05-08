import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SVGPathNodeHModel, SVGPathNodeModel } from '@libs';

@Component({
  selector: 'path-nodes-h',
  standalone: false,
  templateUrl: './path-nodes-h.component.html',
  styleUrl: './path-nodes-h.component.scss',
})
export class PathNodesHComponent {
  public node = input.required<SVGPathNodeHModel | SVGPathNodeModel>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeHModel;

    this.form = new FormGroup({
      x: new FormControl({ value: node.x || 0, disabled: false }),
    });
  }
}

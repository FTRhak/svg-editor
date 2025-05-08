import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SVGPathNodeCModel, SVGPathNodeModel } from '@libs';

@Component({
  selector: 'path-nodes-c',
  standalone: false,
  templateUrl: './path-nodes-c.component.html',
  styleUrl: './path-nodes-c.component.scss',
})
export class PathNodesCComponent implements OnInit {
  public node = input.required<SVGPathNodeCModel | SVGPathNodeModel>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeCModel;

    this.form = new FormGroup({
      x1: new FormControl({ value: node.x1 || 0, disabled: false }),
      y1: new FormControl({ value: node.y1 || 0, disabled: false }),
      x2: new FormControl({ value: node.x2 || 0, disabled: false }),
      y2: new FormControl({ value: node.y2 || 0, disabled: false }),
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }
}

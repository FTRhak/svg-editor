import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SVGPathNodeModel, SVGPathNodeSModel } from '@libs';

@Component({
  selector: 'path-nodes-s',
  standalone: false,
  templateUrl: './path-nodes-s.component.html',
  styleUrl: './path-nodes-s.component.scss',
})
export class PathNodesSComponent implements OnInit {
  public node = input.required<SVGPathNodeSModel | SVGPathNodeModel>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeSModel;

    this.form = new FormGroup({
      x2: new FormControl({ value: node.x2 || 0, disabled: false }),
      y2: new FormControl({ value: node.y2 || 0, disabled: false }),
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }
}

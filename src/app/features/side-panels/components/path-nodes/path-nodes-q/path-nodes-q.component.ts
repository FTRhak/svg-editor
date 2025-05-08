import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SVGPathNodeModel, SVGPathNodeQModel } from '@libs';

@Component({
  selector: 'path-nodes-q',
  standalone: false,
  templateUrl: './path-nodes-q.component.html',
  styleUrl: './path-nodes-q.component.scss',
})
export class PathNodesQComponent implements OnInit {
  public node = input.required<SVGPathNodeQModel | SVGPathNodeModel>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeQModel;

    this.form = new FormGroup({
      x1: new FormControl({ value: node.x1 || 0, disabled: false }),
      y1: new FormControl({ value: node.y1 || 0, disabled: false }),
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }
}

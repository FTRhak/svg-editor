import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SVGPathNodeLModel, SVGPathNodeModel } from '@libs';

@Component({
  selector: 'path-nodes-l',
  standalone: false,
  templateUrl: './path-nodes-l.component.html',
  styleUrl: './path-nodes-l.component.scss',
})
export class PathNodesLComponent implements OnInit {
  public node = input.required<SVGPathNodeLModel | SVGPathNodeModel>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeLModel;

    this.form = new FormGroup({
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }
}

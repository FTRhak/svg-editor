import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SVGPathNodeMModel, SVGPathNodeModel } from '@libs';

@Component({
  selector: 'path-nodes-m',
  standalone: false,
  templateUrl: './path-nodes-m.component.html',
  styleUrl: './path-nodes-m.component.scss',
})
export class PathNodesMComponent implements OnInit {
  public node = input.required<SVGPathNodeMModel | SVGPathNodeModel>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeMModel;

    this.form = new FormGroup({
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }
}

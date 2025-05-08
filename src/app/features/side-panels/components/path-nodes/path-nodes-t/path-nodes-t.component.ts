import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SVGPathNodeModel, SVGPathNodeTModel } from '@libs';

@Component({
  selector: 'path-nodes-t',
  standalone: false,
  templateUrl: './path-nodes-t.component.html',
  styleUrl: './path-nodes-t.component.scss',
})
export class PathNodesTComponent implements OnInit {
  public node = input.required<SVGPathNodeTModel | SVGPathNodeModel>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeTModel;

    this.form = new FormGroup({
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }
}

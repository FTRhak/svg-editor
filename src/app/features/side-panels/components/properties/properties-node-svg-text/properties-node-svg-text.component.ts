import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGTextModel } from '@libs';
import { isUndefined, styleToString } from '@libs/utils';
import { PropertiesNodePanelModel } from '../models';

interface SVGNode {
  text: FormControl<string>;
  fill: FormControl<string | null>;
  transform: FormControl<string | null>;
  style: FormControl<string | null>;
  x: FormControl<number | null>;
  y: FormControl<number | null>;
  dx: FormControl<number | null>;
  dy: FormControl<number | null>;
}

@Component({
  selector: 'properties-node-svg-text',
  standalone: false,
  templateUrl: './properties-node-svg-text.component.html',
  styleUrl: './properties-node-svg-text.component.scss',
})
export class PropertiesNodeSvgTextComponent extends PropertiesNodePanelModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);
  protected override readonly project = inject(ProjectService);

  public readonly node = input.required<SVGTextModel>();

  public form!: FormGroup<SVGNode>;

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      text: new FormControl({ value: node.text || '', disabled: false }, { nonNullable: true }),
      fill: new FormControl({ value: node.fill || '', disabled: isUndefined(node.fill) }),
      transform: new FormControl({ value: node.transform || '', disabled: isUndefined(node.transform) }),
      style: new FormControl({ value: styleToString(node.style) || '', disabled: true }),
      x: new FormControl({ value: node.x || 0, disabled: isUndefined(node.x) }),
      y: new FormControl({ value: node.y || 0, disabled: isUndefined(node.y) }),
      dx: new FormControl({ value: node.dx || 0, disabled: isUndefined(node.dx) }),
      dy: new FormControl({ value: node.dy || 0, disabled: isUndefined(node.dy) }),
    });

    this.updateNodeProperty(this.form, node._id);
    this.listenNodeUpdates(this.form, node._id);
  }
}

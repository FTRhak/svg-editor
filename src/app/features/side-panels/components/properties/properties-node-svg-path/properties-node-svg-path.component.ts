import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGPathModel } from '@libs';
import { isUndefined, styleToString } from '@libs/utils';
import { PropertiesNodePanelModel } from '../models';

interface SVGNode {
  fill: FormControl<string | null>;
  stroke: FormControl<string | null>;
  strokeWidth: FormControl<number | null>;
  transform: FormControl<string | null>;
  style: FormControl<string | null>;
  d: FormControl<string | null>;
}

@Component({
  selector: 'properties-node-svg-path',
  standalone: false,
  templateUrl: './properties-node-svg-path.component.html',
  styleUrl: './properties-node-svg-path.component.scss',
})
export class PropertiesNodeSvgPathComponent extends PropertiesNodePanelModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);
  protected override readonly project = inject(ProjectService);

  public readonly node = input.required<SVGPathModel>();

  public form!: FormGroup<SVGNode>;

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      fill: new FormControl({ value: node.fill || '', disabled: isUndefined(node.fill) }),
      stroke: new FormControl({ value: node.stroke || '', disabled: isUndefined(node.stroke) }),
      strokeWidth: new FormControl({ value: node.strokeWidth || 0, disabled: isUndefined(node.strokeWidth) }),
      transform: new FormControl({ value: node.transform || '', disabled: isUndefined(node.transform) }),
      style: new FormControl({ value: styleToString(node.style) || '', disabled: true }),
      d: new FormControl({ value: node.d || '', disabled: isUndefined(node.d) }),
    });

    this.updateNodeProperty(this.form, node._id);
    this.listenNodeUpdates(this.form, node._id);
  }
}

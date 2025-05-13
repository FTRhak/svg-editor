import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGEllipseModel } from '@libs';
import { isUndefined, styleToString } from '@libs/utils';
import { PropertiesNodePanelModel } from '../models';

interface SVGNode {
  fill: FormControl<string | null>;
  stroke: FormControl<string | null>;
  strokeWidth: FormControl<number | null>;
  transform: FormControl<string | null>;
  style: FormControl<string | null>;
  cx: FormControl<number | null>;
  cy: FormControl<number | null>;
  rx: FormControl<number | null>;
  ry: FormControl<number | null>;
}

@Component({
  selector: 'properties-node-svg-ellipse',
  standalone: false,
  templateUrl: './properties-node-svg-ellipse.component.html',
  styleUrl: './properties-node-svg-ellipse.component.scss',
})
export class PropertiesNodeSvgEllipseComponent extends PropertiesNodePanelModel implements OnInit {
  protected override readonly destroyRef = inject(DestroyRef);
  protected override readonly project = inject(ProjectService);

  public readonly node = input.required<SVGEllipseModel>();

  public form!: FormGroup<SVGNode>;

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      fill: new FormControl({ value: node.fill || '', disabled: isUndefined(node.fill) }),
      stroke: new FormControl({ value: node.stroke || '', disabled: isUndefined(node.stroke) }),
      strokeWidth: new FormControl({ value: node.strokeWidth || 0, disabled: isUndefined(node.strokeWidth) }),
      transform: new FormControl({ value: node.transform || '', disabled: isUndefined(node.transform) }),
      style: new FormControl({ value: styleToString(node.style) || '', disabled: true }),
      cx: new FormControl({ value: node.cx || 0, disabled: isUndefined(node.cx) }),
      cy: new FormControl({ value: node.cy || 0, disabled: isUndefined(node.cy) }),
      rx: new FormControl({ value: node.rx || 0, disabled: isUndefined(node.rx) }),
      ry: new FormControl({ value: node.ry || 0, disabled: isUndefined(node.ry) }),
    });

    this.updateNodeProperty(this.form, node._id);
    this.listenNodeUpdates(this.form, node._id);
  }
}

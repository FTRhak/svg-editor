import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGRectModel } from '@libs';
import { debounceTime } from 'rxjs';
import { isUndefined } from '@libs/utils';

interface SVGNode {
  fill: FormControl<string | null>;
  stroke: FormControl<string | null>;
  strokeWidth: FormControl<number | null>;
  x: FormControl<number | null>;
  y: FormControl<number | null>;
  width: FormControl<number | null>;
  height: FormControl<number | null>;
  rx: FormControl<number | null>;
  ry: FormControl<number | null>;
}

@Component({
  selector: 'properties-node-svg-rect',
  standalone: false,
  templateUrl: './properties-node-svg-rect.component.html',
  styleUrl: './properties-node-svg-rect.component.scss',
})
export class PropertiesNodeSvgRectComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGRectModel>();

  public form!: FormGroup<SVGNode>;

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      fill: new FormControl({ value: node.fill || '', disabled: isUndefined(node.fill) }),
      stroke: new FormControl({ value: node.stroke || '', disabled: isUndefined(node.stroke) }),
      strokeWidth: new FormControl({ value: node.strokeWidth || 0, disabled: isUndefined(node.strokeWidth) }),
      x: new FormControl({ value: node.x || 0, disabled: isUndefined(node.x) }),
      y: new FormControl({ value: node.y || 0, disabled: isUndefined(node.y) }),
      width: new FormControl({ value: node.width || 0, disabled: isUndefined(node.width) }),
      height: new FormControl({ value: node.height || 0, disabled: isUndefined(node.height) }),
      rx: new FormControl({ value: node.rx || 0, disabled: isUndefined(node.rx) }),
      ry: new FormControl({ value: node.ry || 0, disabled: isUndefined(node.ry) }),
    });

    const rawValue = this.form.getRawValue();
    const properties = Object.keys(rawValue);

    for (const property of properties) {
      this.form
        .get(property)
        ?.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          this.form.get(property)?.valid && this.project.setNodeProperty(this.node()._id, property, value);
        });
    }
  }
}

import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGCircleModel } from '@libs';
import { isUndefined } from '@libs/utils';
import { debounceTime } from 'rxjs';

interface SVGNode {
  fill: FormControl<string | null>;
  stroke: FormControl<string | null>;
  strokeWidth: FormControl<number | null>;
  cx: FormControl<number | null>;
  cy: FormControl<number | null>;
  r: FormControl<number | null>;
}

@Component({
  selector: 'properties-node-svg-circle',
  standalone: false,
  templateUrl: './properties-node-svg-circle.component.html',
  styleUrl: './properties-node-svg-circle.component.scss',
})
export class PropertiesNodeSvgCircleComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGCircleModel>();

  public form!: FormGroup<SVGNode>;

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      fill: new FormControl({ value: node.fill || '', disabled: isUndefined(node.fill) }),
      stroke: new FormControl({ value: node.stroke || '', disabled: isUndefined(node.stroke) }),
      strokeWidth: new FormControl({ value: node.strokeWidth || 0, disabled: isUndefined(node.strokeWidth) }),
      cx: new FormControl({ value: node.cx || 0, disabled: isUndefined(node.cx) }),
      cy: new FormControl({ value: node.cy || 0, disabled: isUndefined(node.cy) }),
      r: new FormControl({ value: node.r || 0, disabled: isUndefined(node.r) }),
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

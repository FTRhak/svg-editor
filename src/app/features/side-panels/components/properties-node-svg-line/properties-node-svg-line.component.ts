import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGLineModel } from '@libs';
import { isUndefined, styleToString } from '@libs/utils';
import { debounceTime } from 'rxjs';

interface SVGNode {
  fill: FormControl<string | null>;
  stroke: FormControl<string | null>;
  strokeWidth: FormControl<number | null>;
  transform: FormControl<string | null>;
  style: FormControl<string | null>;
  x1: FormControl<number | null>;
  y1: FormControl<number | null>;
  x2: FormControl<number | null>;
  y2: FormControl<number | null>;
}

@Component({
  selector: 'properties-node-svg-line',
  standalone: false,
  templateUrl: './properties-node-svg-line.component.html',
  styleUrl: './properties-node-svg-line.component.scss',
})
export class PropertiesNodeSvgLineComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGLineModel>();

  public form!: FormGroup<SVGNode>;

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      fill: new FormControl({ value: node.fill || '', disabled: isUndefined(node.fill) }),
      stroke: new FormControl({ value: node.stroke || '', disabled: isUndefined(node.stroke) }),
      strokeWidth: new FormControl({ value: node.strokeWidth || 0, disabled: isUndefined(node.strokeWidth) }),
      transform: new FormControl({ value: node.transform || '', disabled: isUndefined(node.transform) }),
      style: new FormControl({ value: styleToString(node.style) || '', disabled: true }),
      x1: new FormControl({ value: node.x1 || 0, disabled: isUndefined(node.x1) }),
      y1: new FormControl({ value: node.y1 || 0, disabled: isUndefined(node.y1) }),
      x2: new FormControl({ value: node.x2 || 0, disabled: isUndefined(node.x2) }),
      y2: new FormControl({ value: node.y2 || 0, disabled: isUndefined(node.y2) }),
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

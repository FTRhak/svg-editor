import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGEllipseModel } from '@libs';
import { isUndefined } from '@libs/utils';
import { debounceTime } from 'rxjs';

interface SVGNode {
  fill: FormControl<string | null>;
  stroke: FormControl<string | null>;
  strokeWidth: FormControl<number | null>;
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
export class PropertiesNodeSvgEllipseComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGEllipseModel>();

  public form!: FormGroup<SVGNode>;

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      fill: new FormControl({ value: node.fill || '', disabled: isUndefined(node.fill) }),
      stroke: new FormControl({ value: node.stroke || '', disabled: isUndefined(node.stroke) }),
      strokeWidth: new FormControl({ value: node.strokeWidth || 0, disabled: isUndefined(node.strokeWidth) }),
      cx: new FormControl({ value: node.cx || 0, disabled: isUndefined(node.cx) }),
      cy: new FormControl({ value: node.cy || 0, disabled: isUndefined(node.cy) }),
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

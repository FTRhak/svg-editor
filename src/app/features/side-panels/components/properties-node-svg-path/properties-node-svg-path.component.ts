import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGPathModel } from '@libs';
import { isUndefined } from '@libs/utils';
import { debounceTime } from 'rxjs';

interface SVGNode {
  fill: FormControl<string | null>;
  stroke: FormControl<string | null>;
  strokeWidth: FormControl<number | null>;
  d: FormControl<string | null>;
}

@Component({
  selector: 'properties-node-svg-path',
  standalone: false,
  templateUrl: './properties-node-svg-path.component.html',
  styleUrl: './properties-node-svg-path.component.scss',
})
export class PropertiesNodeSvgPathComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGPathModel>();

  public form!: FormGroup<SVGNode>;

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      fill: new FormControl({ value: node.fill || '', disabled: isUndefined(node.fill) }),
      stroke: new FormControl({ value: node.stroke || '', disabled: isUndefined(node.stroke) }),
      strokeWidth: new FormControl({ value: node.strokeWidth || 0, disabled: isUndefined(node.strokeWidth) }),
      d: new FormControl({ value: node.d || '', disabled: isUndefined(node.d) }),
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

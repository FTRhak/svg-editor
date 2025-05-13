import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGRootModel } from '@libs';
import { isUndefined } from '@libs/utils';
import { debounceTime } from 'rxjs';

interface SVGNode {
  width: FormControl<string | null>;
  height: FormControl<string | null>;
  baseProfile: FormControl<string | null>;
  preserveAspectRatio: FormControl<string | null>;
  x: FormControl<string | null>;
  y: FormControl<string | null>;
  viewBox: FormGroup;
}

@Component({
  selector: 'properties-node-svg',
  standalone: false,
  templateUrl: './properties-node-svg.component.html',
  styleUrl: './properties-node-svg.component.scss',
})
export class PropertiesNodeSvgComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGRootModel>();

  public form!: FormGroup<SVGNode>;

  public get viewBoxGroup() {
    return this.form.get('viewBox') as FormGroup;
  }

  public readonly baseProfiles = ['none', 'full'];
  public readonly preserveAspectRatios = [
    'none',
    'xMinYMin',
    'xMidYMin',
    'xMaxYMin',
    'xMinYMid',
    'xMidYMid',
    'xMaxYMid',
    'xMinYMax',
    'xMidYMax',
    'xMaxYMax',
  ];

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      width: new FormControl({ value: node.width || '', disabled: isUndefined(node.width) }),
      height: new FormControl({ value: node.height || '', disabled: isUndefined(node.height) }),
      baseProfile: new FormControl({ value: node.baseProfile || '', disabled: isUndefined(node.baseProfile) }),
      preserveAspectRatio: new FormControl({
        value: node.preserveAspectRatio || '',
        disabled: isUndefined(node.preserveAspectRatio),
      }),
      x: new FormControl({ value: node.x || '', disabled: isUndefined(node.x) }),
      y: new FormControl({ value: node.y || '', disabled: isUndefined(node.y) }),

      viewBox: new FormGroup({
        x: new FormControl({ value: node.viewBox?.x || '', disabled: false }),
        y: new FormControl({ value: node.viewBox?.y || '', disabled: false }),
        width: new FormControl({ value: node.viewBox?.width || '', disabled: false }),
        height: new FormControl({ value: node.viewBox?.height || '', disabled: false }),
      }),
    });

    const rawValue = this.form.getRawValue();
    const properties = Object.keys(rawValue);

    for (const property of properties) {
      this.form
        .get(property)
        ?.valueChanges.pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          this.form.valid && this.project.setNodeProperty(this.node()._id, property, value);
        });
    }
  }
}

import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGLinearGradientModel, SVGRootModel, SVGStopModel, TreeNodeModel } from '@libs';
import { isUndefined } from '@libs/utils';
import { debounceTime, fromEvent } from 'rxjs';

interface SVGNode {
  id: FormControl<string | null>;
  gradientTransform: FormControl<number | null>;
  stops: FormArray<any>;
}

@Component({
  selector: 'properties-node-svg-linear-gradient',
  standalone: false,
  templateUrl: './properties-node-svg-linear-gradient.component.html',
  styleUrl: './properties-node-svg-linear-gradient.component.scss',
})
export class PropertiesNodeSvgLinearGradientComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGLinearGradientModel>();

  public form!: FormGroup<SVGNode>;

  get stops() {
    return this.form.controls['stops'] as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      id: new FormControl({ value: node.id || '', disabled: isUndefined(node.id) }),
      gradientTransform: new FormControl({
        value: node.gradientTransform || null,
        disabled: isUndefined(node.gradientTransform),
      }),
      stops: new FormArray<any>([]),
    });

    if (node.stops.length) {
      node.stops.forEach((model) => this.addStop(model));
    }

    const rawValue = this.form.getRawValue();
    const properties = Object.keys(rawValue);

    for (const property of properties) {
      this.form
        .get(property)
        ?.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          console.log(property, value);
          if (property === 'stops') {
            //this.form.get(property)?.valid && this.project.setNodeProperty(this.node()._id, property, value);
          } else {
            this.form.get(property)?.valid && this.project.setNodeProperty(this.node()._id, property, value);
          }
        });
    }

    fromEvent<[SVGRootModel, TreeNodeModel, string, any]>(this.project.events, 'project:item:updated')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item, propertyName, value]) => {
        // console.log();
        //this.form.setValue({ ...this.form.getRawValue(), [propertyName]: value } as any, { emitEvent: false });
      });
  }

  addStop(model: SVGStopModel = {} as any) {
    const stops = this.form.get('stops') as FormArray<any>;
    stops.push(
      new FormGroup<any>({
        stopColor: new FormControl({ value: model.stopColor || '', disabled: isUndefined(model.stopColor) }),
        stopOpacity: new FormControl({ value: model.stopOpacity || '', disabled: isUndefined(model.stopOpacity) }),
        offset: new FormControl({ value: model.offset || '', disabled: isUndefined(model.offset) }),
      }),
    );
  }
}

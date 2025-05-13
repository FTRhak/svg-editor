import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGLinearGradientModel, SVGNodeType, SVGRootModel, SVGStopModel, TreeNodeModel } from '@libs';
import { isUndefined } from '@libs/utils';
import { debounceTime, fromEvent } from 'rxjs';

interface SVGNodeStop {
  id: FormControl<string | null>;
  stopColor: FormControl<string | null>;
  stopOpacity: FormControl<number | null>;
  offset: FormControl<number | null>;
}

interface SVGNode {
  id: FormControl<string | null>;
  gradientTransform: FormControl<number | null>;
  stops: FormArray<FormGroup<SVGNodeStop>>;
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

  get stops(): FormArray<FormGroup<SVGNodeStop>> {
    return this.form.controls['stops'];
  }

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      id: new FormControl({ value: node.id || '', disabled: isUndefined(node.id) }),
      gradientTransform: new FormControl({
        value: node.gradientTransform || null,
        disabled: isUndefined(node.gradientTransform),
      }),
      stops: new FormArray<FormGroup<SVGNodeStop>>([]),
    });

    if (node.children.length) {
      node.children.forEach((model) => this.addStop(model as SVGStopModel));
    }

    const rawValue = this.form.getRawValue();
    const properties = Object.keys(rawValue);

    for (const property of properties) {
      this.form
        .get(property)
        ?.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          if (property !== 'stops') {
            this.form.valid && this.project.setNodeProperty(this.node()._id, property, value);
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
    const stopGroup = new FormGroup<SVGNodeStop>({
      id: new FormControl(model._id),
      stopColor: new FormControl({ value: model.stopColor || '', disabled: isUndefined(model.stopColor) }),
      stopOpacity: new FormControl({ value: model.stopOpacity || 1, disabled: isUndefined(model.stopOpacity) }),
      offset: new FormControl({ value: model.offset || 0, disabled: isUndefined(model.offset) }),
    });

    this.stops.push(stopGroup);

    stopGroup.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.project.setNodeProperty(value.id!, 'stopColor', value.stopColor);
      this.project.setNodeProperty(value.id!, 'stopOpacity', value.stopOpacity);
      this.project.setNodeProperty(value.id!, 'offset', value.offset);
    });
  }

  onClickAddStop() {
    this.project.addChildItem(this.node()._id, SVGNodeType.STOP, { stopColor: '#fff', stopOpacity: 1, offset: 0 });

    this.stops.clear();
    this.node().children.forEach((model) => this.addStop(model as SVGStopModel));
  }
}

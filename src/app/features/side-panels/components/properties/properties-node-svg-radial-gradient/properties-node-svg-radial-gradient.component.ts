import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGNodeType, SVGRadialGradientModel, SVGStopModel } from '@libs';
import { isUndefined } from '@libs/utils';
import { debounceTime } from 'rxjs';

interface SVGNodeStop {
  id: FormControl<string | null>;
  stopColor: FormControl<string | null>;
  stopOpacity: FormControl<number | null>;
  offset: FormControl<number | null>;
}

interface SVGNode {
  id: FormControl<string | null>;
  gradientTransform: FormControl<number | null>;

  cx: FormControl<number | null>;
  cy: FormControl<number | null>;
  fr: FormControl<number | null>;
  fx: FormControl<number | null>;
  fy: FormControl<number | null>;
  r: FormControl<number | null>;
  gradientUnits: FormControl<string | null>; // objectBoundingBox | userSpaceOnUse
  href: FormControl<string | null>;
  spreadMethod: FormControl<string | null>; // pad | reflect | repeat

  stops: FormArray<FormGroup<SVGNodeStop>>;
}

@Component({
  selector: 'properties-node-svg-radial-gradient',
  standalone: false,
  templateUrl: './properties-node-svg-radial-gradient.component.html',
  styleUrl: './properties-node-svg-radial-gradient.component.scss',
})
export class PropertiesNodeSvgRadialGradientComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly gradientUnitsList = ['objectBoundingBox', 'userSpaceOnUse'];
  public readonly spreadMethodList = ['pad', 'reflect', 'repeat'];

  public readonly node = input.required<SVGRadialGradientModel>();

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

      cx: new FormControl({ value: node.cx || null, disabled: isUndefined(node.cx) }),
      cy: new FormControl({ value: node.cy || null, disabled: isUndefined(node.cy) }),
      fr: new FormControl({ value: node.fr || null, disabled: isUndefined(node.fr) }),
      fx: new FormControl({ value: node.fx || null, disabled: isUndefined(node.fx) }),
      fy: new FormControl({ value: node.fy || null, disabled: isUndefined(node.fy) }),
      r: new FormControl({ value: node.r || null, disabled: isUndefined(node.r) }),
      gradientUnits: new FormControl({ value: node.gradientUnits || null, disabled: isUndefined(node.gradientUnits) }),
      href: new FormControl({ value: node.href || null, disabled: isUndefined(node.href) }),
      spreadMethod: new FormControl({ value: node.spreadMethod || null, disabled: isUndefined(node.spreadMethod) }),

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
            this.form.valid && this.project.setNodeProperty(node._id, property, value);
          }
        });
    }

    //fromEvent<[SVGRootModel, TreeNodeModel, string, any]>(this.project.events, 'project:item:updated')
    //  .pipe(takeUntilDestroyed(this.destroyRef))
    //  .subscribe(([project, item, propertyName, value]) => {
    // console.log();
    //this.form.setValue({ ...this.form.getRawValue(), [propertyName]: value } as any, { emitEvent: false });
    //});
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

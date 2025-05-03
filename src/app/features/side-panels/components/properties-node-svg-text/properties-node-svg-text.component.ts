import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGRootModel, SVGTextModel, TreeNodeModel } from '@libs';
import { isUndefined, styleToString } from '@libs/utils';
import { debounceTime, fromEvent } from 'rxjs';

interface SVGNode {
  text: FormControl<string>;
  fill: FormControl<string | null>;
  transform: FormControl<string | null>;
  style: FormControl<string | null>;
  x: FormControl<number | null>;
  y: FormControl<number | null>;
  dx: FormControl<number | null>;
  dy: FormControl<number | null>;
}

@Component({
  selector: 'properties-node-svg-text',
  standalone: false,
  templateUrl: './properties-node-svg-text.component.html',
  styleUrl: './properties-node-svg-text.component.scss',
})
export class PropertiesNodeSvgTextComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGTextModel>();

  public form!: FormGroup<SVGNode>;

  ngOnInit(): void {
    const node = this.node();
    this.form = new FormGroup<SVGNode>({
      text: new FormControl({ value: node.text || '', disabled: false }, { nonNullable: true }),
      fill: new FormControl({ value: node.fill || '', disabled: isUndefined(node.fill) }),
      transform: new FormControl({ value: node.transform || '', disabled: isUndefined(node.transform) }),
      style: new FormControl({ value: styleToString(node.style) || '', disabled: true }),
      x: new FormControl({ value: node.x || 0, disabled: isUndefined(node.x) }),
      y: new FormControl({ value: node.y || 0, disabled: isUndefined(node.y) }),
      dx: new FormControl({ value: node.dx || 0, disabled: isUndefined(node.dx) }),
      dy: new FormControl({ value: node.dy || 0, disabled: isUndefined(node.dy) }),
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

    fromEvent<[SVGRootModel, TreeNodeModel, string, any]>(this.project.events, 'project:item:updated')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item, propertyName, value]) => {
        this.form.setValue({ ...this.form.getRawValue(), [propertyName]: value } as any, { emitEvent: false });
      });
  }
}

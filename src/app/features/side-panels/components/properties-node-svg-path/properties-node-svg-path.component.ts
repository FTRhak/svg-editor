import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGPathModel } from '@libs';

interface SVGNode {
  fill: FormControl<string>;
  stroke: FormControl<string>;
  strokeWidth: FormControl<number>;
  d: FormControl<string>;
}

@Component({
  selector: 'properties-node-svg-path',
  standalone: false,
  templateUrl: './properties-node-svg-path.component.html',
  styleUrl: './properties-node-svg-path.component.scss',
})
export class PropertiesNodeSvgPathComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGPathModel>();

  public form = new FormGroup<SVGNode>({
    fill: new FormControl('', { nonNullable: true }),
    stroke: new FormControl('', { nonNullable: true }),
    strokeWidth: new FormControl(0, { nonNullable: true }),
    d: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      console.log('change:', value);
    });
  }
}

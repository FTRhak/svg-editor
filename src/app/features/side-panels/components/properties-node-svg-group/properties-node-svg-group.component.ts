import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGGroupModel } from '@libs';

interface SVGNode {
  fill: FormControl<string>;
  stroke: FormControl<string>;
  strokeWidth: FormControl<number>;
}

@Component({
  selector: 'properties-node-svg-group',
  standalone: false,
  templateUrl: './properties-node-svg-group.component.html',
  styleUrl: './properties-node-svg-group.component.scss',
})
export class PropertiesNodeSvgGroupComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGGroupModel>();

  public form = new FormGroup<SVGNode>({
    fill: new FormControl('', { nonNullable: true }),
    stroke: new FormControl('', { nonNullable: true }),
    strokeWidth: new FormControl(0, { nonNullable: true }),
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      console.log('change:', value);
    });
  }
}

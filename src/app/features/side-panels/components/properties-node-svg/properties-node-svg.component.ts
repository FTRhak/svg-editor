import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { SVGRootModel } from '@libs';

interface SVGNode {
  width: FormControl<number>;
  height: FormControl<number>;
  viewBox: FormControl<string>;
  baseProfile: FormControl<string>;
  preserveAspectRatio: FormControl<string>;
  x: FormControl<number>;
  y: FormControl<number>;
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

  public form = new FormGroup<SVGNode>({
    width: new FormControl(1, { nonNullable: true }),
    height: new FormControl(1, { nonNullable: true }),
    viewBox: new FormControl('', { nonNullable: true }),
    baseProfile: new FormControl('', { nonNullable: true }),
    preserveAspectRatio: new FormControl('', { nonNullable: true }),
    x: new FormControl(0, { nonNullable: true }),
    y: new FormControl(0, { nonNullable: true }),
  });

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
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      console.log('change:', value);
    });
  }
}

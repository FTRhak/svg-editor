import { Component, DestroyRef, inject, input } from '@angular/core';
import { ProjectService } from '@core/services';
import { SVGRadialGradientModel } from '@libs';

@Component({
  selector: 'properties-node-svg-radial-gradient',
  standalone: false,
  templateUrl: './properties-node-svg-radial-gradient.component.html',
  styleUrl: './properties-node-svg-radial-gradient.component.scss',
})
export class PropertiesNodeSvgRadialGradientComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly node = input.required<SVGRadialGradientModel>();
}

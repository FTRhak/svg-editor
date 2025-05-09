import { Component, input } from '@angular/core';

@Component({
  selector: 'preview-svg',
  standalone: false,
  templateUrl: './preview-svg.component.html',
  styleUrl: './preview-svg.component.scss',
})
export class PreviewSvgComponent {
  public readonly label = input.required<string>();
  public readonly svg = input.required<string[]>();
  public readonly size = input<string>('40');
}

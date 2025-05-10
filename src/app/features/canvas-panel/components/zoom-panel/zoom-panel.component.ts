import { Component, input, output } from '@angular/core';

@Component({
  selector: 'zoom-panel',
  standalone: false,
  templateUrl: './zoom-panel.component.html',
  styleUrl: './zoom-panel.component.scss',
})
export class ZoomPanelComponent {
  public readonly zoom = input.required<number>();

  public readonly zoomChange = output<number>();
  public readonly fitCanvas = output<void>();

  onZoomChanged(zoomValue: number) {
    this.zoomChange.emit(zoomValue);
  }

  onFitCanvas() {
    this.fitCanvas.emit();
  }
}

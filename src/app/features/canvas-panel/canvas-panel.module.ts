import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasPanelComponent } from './components/canvas-panel/canvas-panel.component';
import { ZoomPanelComponent } from './components/zoom-panel/zoom-panel.component';

@NgModule({
  declarations: [CanvasPanelComponent, ZoomPanelComponent],
  exports: [CanvasPanelComponent],
  imports: [CommonModule],
})
export class CanvasPanelModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasPanelComponent } from './components/canvas-panel/canvas-panel.component';
import { ZoomPanelComponent } from './components/zoom-panel/zoom-panel.component';
import { CanvasManualEditDirective } from './directives/canvas-manual-edit/canvas-manual-edit.directive';

@NgModule({
  declarations: [CanvasPanelComponent, ZoomPanelComponent, CanvasManualEditDirective],
  exports: [CanvasPanelComponent],
  imports: [CommonModule],
})
export class CanvasPanelModule {}

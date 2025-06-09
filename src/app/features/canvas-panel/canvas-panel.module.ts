import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeSharedModule } from '@shared';
import { CanvasPanelComponent } from './components/canvas-panel/canvas-panel.component';
import { CanvasToolsComponent } from './components/canvas-tools/canvas-tools.component';
import { ZoomPanelComponent } from './components/zoom-panel/zoom-panel.component';
import { CanvasGridRenderDirective } from './directives/canvas-grid-render/canvas-grid-render.directive';
import { CanvasLineModule } from '@features/canvas-line';

@NgModule({
  declarations: [CanvasPanelComponent, ZoomPanelComponent, CanvasToolsComponent, CanvasGridRenderDirective],
  exports: [CanvasPanelComponent],
  imports: [CommonModule, PrimeSharedModule, FormsModule, CanvasLineModule],
})
export class CanvasPanelModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeSharedModule } from '@shared';
import { CanvasManualEditComponent } from './components/canvas-manual-edit/canvas-manual-edit.component';
import { CanvasPanelComponent } from './components/canvas-panel/canvas-panel.component';
import { CanvasToolsComponent } from './components/canvas-tools/canvas-tools.component';
import { ZoomPanelComponent } from './components/zoom-panel/zoom-panel.component';
import { CanvasManualEditDirective } from './directives/canvas-manual-edit/canvas-manual-edit.directive';
import { CanvasGridRenderDirective } from './directives/canvas-grid-render/canvas-grid-render.directive';

@NgModule({
  declarations: [
    CanvasPanelComponent,
    ZoomPanelComponent,
    CanvasManualEditDirective,
    CanvasManualEditComponent,
    CanvasToolsComponent,
    CanvasGridRenderDirective,
  ],
  exports: [CanvasPanelComponent],
  imports: [CommonModule, PrimeSharedModule, FormsModule],
})
export class CanvasPanelModule {}

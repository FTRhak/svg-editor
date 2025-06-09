import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasLineComponent } from './components/canvas-line/canvas-line.component';

@NgModule({
  declarations: [CanvasLineComponent],
  exports: [CanvasLineComponent],
  imports: [CommonModule],
})
export class CanvasLineModule {}

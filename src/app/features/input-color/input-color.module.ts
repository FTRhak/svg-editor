import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeSharedModule } from '@shared';
import { InputSvgColorComponent } from './components/input-svg-color/input-svg-color.component';
import { PopoverColorComponent } from './components/popover-color/popover-color.component';

@NgModule({
  declarations: [InputSvgColorComponent, PopoverColorComponent],
  exports: [InputSvgColorComponent],
  imports: [CommonModule, PrimeSharedModule, FormsModule],
})
export class InputColorModule {}

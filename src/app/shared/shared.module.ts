import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeContextmenuNoSelectionDirective } from './directives/tree-contextmenu-noselection/tree-contextmenu-noselection.directive';
import { PrimeSharedModule } from './prime-shared.module';
import { PreviewSvgComponent } from './components/preview-svg/preview-svg.component';

@NgModule({
  declarations: [TreeContextmenuNoSelectionDirective, PreviewSvgComponent],
  exports: [TreeContextmenuNoSelectionDirective, PreviewSvgComponent],
  imports: [CommonModule, PrimeSharedModule],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeContextmenuNoSelectionDirective } from './directives/tree-contextmenu-noselection/tree-contextmenu-noselection.directive';
import { PrimeSharedModule } from './prime-shared.module';

@NgModule({
  declarations: [TreeContextmenuNoSelectionDirective],
  exports: [TreeContextmenuNoSelectionDirective],
  imports: [CommonModule, PrimeSharedModule],
})
export class SharedModule {}

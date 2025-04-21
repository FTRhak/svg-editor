import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeContextmenuNoSelectionDirective } from './directives/tree-contextmenu-noselection/tree-contextmenu-noselection.directive';

@NgModule({
  declarations: [TreeContextmenuNoSelectionDirective],
  exports: [TreeContextmenuNoSelectionDirective],
  imports: [CommonModule],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeSharedModule } from '@shared';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ImportDialogComponent } from './dialogs/import-dialog/import-dialog.component';

@NgModule({
  declarations: [MainMenuComponent, ImportDialogComponent],
  exports: [MainMenuComponent],
  imports: [CommonModule, FormsModule, PrimeSharedModule],
})
export class MainMenuModule {}

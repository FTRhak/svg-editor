import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeSharedModule, SharedModule } from '@shared';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ImportDialogComponent } from './dialogs/import-dialog/import-dialog.component';
import { ViewCodeDialogComponent } from './dialogs/view-code-dialog/view-code-dialog.component';
import { PresetsDialogComponent } from './dialogs/presets-dialog/presets-dialog.component';
import { CdkListboxModule } from '@angular/cdk/listbox';

@NgModule({
  declarations: [MainMenuComponent, ImportDialogComponent, ViewCodeDialogComponent, PresetsDialogComponent],
  exports: [MainMenuComponent],
  imports: [CommonModule, FormsModule, PrimeSharedModule, SharedModule, CdkListboxModule],
})
export class MainMenuModule {}

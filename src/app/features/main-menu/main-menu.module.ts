import { CdkListboxModule } from '@angular/cdk/listbox';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeSharedModule, SharedModule } from '@shared';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ImportDialogComponent } from './dialogs/import-dialog/import-dialog.component';
import { NewProjectDialogComponent } from './dialogs/new-project-dialog/new-project-dialog.component';
import { PresetsDialogComponent } from './dialogs/presets-dialog/presets-dialog.component';
import { ViewCodeDialogComponent } from './dialogs/view-code-dialog/view-code-dialog.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    ImportDialogComponent,
    ViewCodeDialogComponent,
    PresetsDialogComponent,
    NewProjectDialogComponent,
  ],
  exports: [MainMenuComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeSharedModule, SharedModule, CdkListboxModule],
})
export class MainMenuModule {}

import { Component, ElementRef, inject, OnDestroy, viewChild } from '@angular/core';
import { ProjectService } from '@core/services';
import { ImportDialogComponent } from '@features/main-menu/dialogs/import-dialog/import-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'main-menu',
  standalone: false,
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
  providers: [DialogService],
})
export class MainMenuComponent implements OnDestroy {
  private readonly project = inject(ProjectService);
  private readonly dialogService = inject(DialogService);

  public readonly items = [
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.project.createNewProject();
          },
        },
        {
          label: 'Import',
          icon: 'pi pi-fw pi-upload',
          command: () => {
            this.openFile();
            //this.project.createNewProject();
          },
        },
      ],
    },
    {
      label: 'Features',
      icon: 'pi pi-star',
    },
  ];

  private ref: DynamicDialogRef | undefined;

  ngOnDestroy(): void {
    this.ref?.close();
  }

  public openFile() {
    this.ref = this.dialogService.open(ImportDialogComponent, { header: 'Import SVG', modal: true, width: '300px' });

    this.ref.onClose.subscribe(() => {});
  }
}

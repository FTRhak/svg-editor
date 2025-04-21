import { Component, inject, OnDestroy } from '@angular/core';
import { ProjectService } from '@core/services';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImportDialogComponent } from '../../dialogs/import-dialog/import-dialog.component';
import { ViewCodeDialogComponent } from '@features/main-menu/dialogs/view-code-dialog/view-code-dialog.component';

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
          },
        },
        {
          label: 'Export',
          icon: 'pi pi-fw pi-file-export',
          command: () => {
            this.exportProject();
          },
        },
      ],
    },
    {
      label: 'View',
      icon: 'pi pi-wrench',
      items: [
        {
          label: 'Show Result Code',
          icon: 'pi pi-fw pi-code',
          command: () => {
            this.showResultCode();
          },
        },
      ],
    },
  ];

  private ref: DynamicDialogRef | undefined;

  ngOnDestroy(): void {
    this.ref?.close();
  }

  public showResultCode() {
    this.ref = this.dialogService.open(ViewCodeDialogComponent, { header: 'SVG code', modal: true, width: '80vw' });
    this.ref.onClose.subscribe(() => {});
  }

  public openFile() {
    this.ref = this.dialogService.open(ImportDialogComponent, { header: 'Import SVG', modal: true, width: '300px' });
    this.ref.onClose.subscribe(() => {});
  }

  public exportProject() {
    const svgCode = this.project.exportSVG();
    const blob = this.toBlob(svgCode, 'image/svg+xml;charset=utf-8');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('A') as HTMLLinkElement;
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.setAttribute('download', 'file.svg');
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private toBlob(byteCharacters: string, contentType = '', sliceSize = 51200): Blob {
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}

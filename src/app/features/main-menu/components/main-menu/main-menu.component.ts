import { Component, inject, OnDestroy } from '@angular/core';
import { CreateSvgNodeService, ProjectService } from '@core/services';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImportDialogComponent } from '../../dialogs/import-dialog/import-dialog.component';
import { ViewCodeDialogComponent } from '../../dialogs/view-code-dialog/view-code-dialog.component';
import { PresetsDialogComponent } from '@features/main-menu/dialogs/presets-dialog/presets-dialog.component';

@Component({
  selector: 'main-menu',
  standalone: false,
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
  providers: [DialogService],
})
export class MainMenuComponent implements OnDestroy {
  private readonly project = inject(ProjectService);
  private readonly createSvgNodeService = inject(CreateSvgNodeService);
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
    {
      label: 'Add',
      icon: 'pi pi-plus',
      items: [
        {
          label: 'Defs',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: 'Linear Gradient',
              icon: 'pi pi-fw pi-plus',
              command: () => {
                this.createSvgNodeService.createDefsLinearGradient();
              },
            },
            {
              label: 'Radial Gradient',
              icon: 'pi pi-fw pi-plus',
              command: () => {
                this.createSvgNodeService.createDefsRadialGradient();
              },
            },
          ],
        },
        {
          label: 'Group',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.createSvgNodeService.createDefaultGroup();
          },
        },
        {
          label: 'Path',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.createSvgNodeService.createDefaultPath();
          },
        },
        {
          label: 'Rectangle',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.createSvgNodeService.createDefaultRect();
          },
        },
        {
          label: 'Circle',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.createSvgNodeService.createDefaultCircle();
          },
        },
        {
          label: 'Ellipse',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.createSvgNodeService.createDefaultEllipse();
          },
        },
        {
          label: 'Line',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.createSvgNodeService.createDefaultLine();
          },
        },
        {
          label: 'Text',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.createSvgNodeService.createDefaultText();
          },
        },
      ],
    },
    {
      label: 'Object',
      items: [
        {
          label: 'Insert preset',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.insertPreset();
          },
        },
      ],
    },
  ];

  private ref: DynamicDialogRef | undefined;

  ngOnDestroy(): void {
    this.ref?.close();
  }

  public insertPreset() {
    this.ref = this.dialogService.open(PresetsDialogComponent, { header: 'Presets', modal: true, width: '575px' });
    this.ref.onClose.subscribe(() => {});
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

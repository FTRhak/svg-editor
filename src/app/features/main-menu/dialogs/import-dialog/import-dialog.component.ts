import { HttpClient } from '@angular/common/http';
import { Component, inject, viewChild } from '@angular/core';
import { ProjectService } from '@core/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'import-dialog',
  standalone: false,
  templateUrl: './import-dialog.component.html',
  styleUrl: './import-dialog.component.scss',
  providers: [
    {
      provide: HttpClient,
      useValue: {
        post: (...args: any) => {},
      },
    },
  ],
})
export class ImportDialogComponent {
  private readonly project = inject(ProjectService);
  private ref = inject(DynamicDialogRef);

  input = viewChild<FileUpload>('fu');

  onClickCancel() {
    this.ref?.close();
  }

  onClickUpload() {
    const files = this.input()!.files;
    files[0].text().then((text) => {
      this.project.importSVG(text);
      this.ref?.close(1);
    });
  }
}

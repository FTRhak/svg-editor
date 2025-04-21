import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { ProjectService } from '@core/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'view-code-dialog',
  standalone: false,
  templateUrl: './view-code-dialog.component.html',
  styleUrl: './view-code-dialog.component.scss',
})
export class ViewCodeDialogComponent implements AfterViewInit {
  private readonly project = inject(ProjectService);
  private ref = inject(DynamicDialogRef);

  code = signal<string>('');

  ngAfterViewInit(): void {
    this.code.set(this.project.exportSVG());
  }

  onClickCancel() {
    this.ref?.close();
  }
}

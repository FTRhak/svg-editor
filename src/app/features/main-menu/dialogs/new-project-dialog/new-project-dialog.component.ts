import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@core/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'new-project-dialog',
  standalone: false,
  templateUrl: './new-project-dialog.component.html',
  styleUrl: './new-project-dialog.component.scss',
})
export class NewProjectDialogComponent {
  private readonly project = inject(ProjectService);
  private ref = inject(DynamicDialogRef);

  public readonly form = new FormGroup({
    width: new FormControl(10, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(1024 * 4)],
    }),
    height: new FormControl(10, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(1024 * 4)],
    }),

    widthScene: new FormControl(10, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(1024 * 4)],
    }),
    heightScene: new FormControl(10, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(1024 * 4)],
    }),
  });

  onClickCancel() {
    this.ref?.close();
  }

  onClickCreate() {
    const model = this.form.value;
    this.project.createNewProject(model.width, model.height, model.widthScene, model.heightScene);
    this.ref?.close();
  }
}

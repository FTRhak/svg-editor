import { Component, DestroyRef, inject } from '@angular/core';
import { ProjectService } from '@core/services';

@Component({
  selector: 'panel-actions',
  standalone: false,
  templateUrl: './panel-actions.component.html',
  styleUrl: './panel-actions.component.scss',
})
export class PanelActionsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public onClickResize(sizeCoefficient: number): void {
    this.project.resizeSelectedItem(sizeCoefficient);
  }
}

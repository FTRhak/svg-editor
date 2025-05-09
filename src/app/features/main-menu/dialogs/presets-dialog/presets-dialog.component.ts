import { Component, createNgModule, inject, OnInit, signal } from '@angular/core';
import { ProjectService } from '@core/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'presets-dialog',
  standalone: false,
  templateUrl: './presets-dialog.component.html',
  styleUrl: './presets-dialog.component.scss',
})
export class PresetsDialogComponent implements OnInit {
  private readonly project = inject(ProjectService);
  private ref = inject(DynamicDialogRef);

  public list = signal<any[]>([]);

  async ngOnInit() {
    /*import('@features/presets-collection').then(
                (m) => m.PresetsCollectionModule
            );*/

    const { PresetsCollectionModule } = await import('@features/presets-collection');
    const moduleObj = createNgModule(PresetsCollectionModule).instance;

    this.list.set(moduleObj.collection.dataList);
  }

  onClickCancel() {
    this.ref?.close();
  }

  onClickSelect() {
    this.ref?.close();
  }
}

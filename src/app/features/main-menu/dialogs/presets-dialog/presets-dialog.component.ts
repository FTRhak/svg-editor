import { Component, createNgModule, inject, OnInit, signal } from '@angular/core';
import { ProjectService } from '@core/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

interface PresetItem {
  label: string;
  paths: string[];
}

@Component({
  selector: 'presets-dialog',
  standalone: false,
  templateUrl: './presets-dialog.component.html',
  styleUrl: './presets-dialog.component.scss',
})
export class PresetsDialogComponent implements OnInit {
  private readonly project = inject(ProjectService);
  private ref = inject(DynamicDialogRef);

  public list = signal<PresetItem[]>([]);

  public selectedItem: PresetItem[] = [];
  public doResize: boolean = true;
  public doAspectRatio: boolean = true;

  async ngOnInit() {
    const { PresetsCollectionModule } = await import('@features/presets-collection');
    const moduleObj = createNgModule(PresetsCollectionModule).instance;

    this.list.set(moduleObj.collection.dataList);
  }

  onClickCancel() {
    this.ref?.close();
  }

  onClickInsert() {
    this.selectedItem.forEach((item) => {
      this.project.insertPresetItems(item.paths, this.doResize, this.doAspectRatio);
    });
    this.ref?.close(true);
  }
}

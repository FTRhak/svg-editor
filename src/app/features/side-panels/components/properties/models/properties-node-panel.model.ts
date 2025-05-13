import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { PID, SVGRootModel, TreeNodeModel } from '@libs';
import { debounceTime, fromEvent } from 'rxjs';

export class PropertiesNodePanelModel {
  protected readonly destroyRef!: DestroyRef;
  protected readonly project!: ProjectService;

  protected updateNodeProperty(form: FormGroup, nodeID: PID): void {
    const rawValue = form.getRawValue();
    const properties = Object.keys(rawValue);

    for (const property of properties) {
      form
        .get(property)
        ?.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          form.valid && this.project.setNodeProperty(nodeID, property, value);
        });
    }
  }

  protected listenNodeUpdates(form: FormGroup, nodeID: PID): void {
    fromEvent<[SVGRootModel, TreeNodeModel, string, any]>(this.project.events, 'project:item:updated')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item, propertyName, value]) => {
        item._id === nodeID &&
          form.setValue({ ...form.getRawValue(), [propertyName]: value } as any, { emitEvent: false });
      });
  }
}

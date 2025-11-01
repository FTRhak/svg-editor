import { DestroyRef, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { PID } from '@libs';
import { debounceTime } from 'rxjs';

export class PathNodesDPropertyModel {
  protected readonly destroyRef!: DestroyRef;

  public readonly SETTINGS_MIN_NUM = -9999;
  public readonly SETTINGS_MAX_NUM = 9999;

  public form!: FormGroup;

  public node!: InputSignal<any>;
  public readonly changeNode!: OutputEmitterRef<[string, string, any]>;

  public bindPropertyChanged(): void {
    const rawValue = this.form.getRawValue();
    const properties = Object.keys(rawValue);

    for (const property of properties) {
      this.form
        .get(property)
        ?.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          this.changeNode.emit([this.node().id, property, this.valueOutputTransform(property, value || 0)]);
        });
    }
  }

  /**
   * A function that transforms a value before emitting it to the changeNode
   * output. If the value is undefined or null, it will return 0.
   * @param property The property name of the value being transformed.
   * @param value The value being transformed.
   * @returns The transformed value.
   */
  protected valueOutputTransform(property: string, value: any) {
    return value || 0;
  }

  public onToggleType() {
    this.changeNode.emit([this.node().id, 'isLocal', !this.node().isLocal]);
  }
}

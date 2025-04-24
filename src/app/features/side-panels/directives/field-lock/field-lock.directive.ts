import { AfterViewInit, ChangeDetectorRef, Directive, HostListener, inject, input, signal } from '@angular/core';
import { FormGroupDirective, NG_VALIDATORS } from '@angular/forms';
import { Button } from 'primeng/button';

@Directive({
  selector: '[fieldLock]',
  standalone: false,
  providers: [{ provide: NG_VALIDATORS, useExisting: FieldLockDirective, multi: true }],
})
export class FieldLockDirective implements AfterViewInit {
  private readonly ref: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly formGroup = inject(FormGroupDirective);
  private readonly el = inject(Button);

  formFieldName = input.required<string>({ alias: 'fieldLock' });

  disabled = signal<boolean>(false);

  @HostListener('click') onClick() {
    const field = this.formGroup.control.get(this.formFieldName());
    if (field?.disabled) {
      field.enable();
    } else {
      field?.disable();
      field?.setValue('');
    }

    this.disabled.set(field?.disabled || false);
    this.updateButtonStatus();
  }

  ngAfterViewInit(): void {
    this.updateButtonStatus();
  }

  private updateButtonStatus() {
    const field = this.formGroup.control.get(this.formFieldName());
    this.disabled.set(field?.disabled || false);
    this.el.icon = field?.disabled ? 'pi pi-lock' : 'pi pi-lock-open';
    this.ref.markForCheck();
  }
}

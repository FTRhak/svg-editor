import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, input, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Popover } from 'primeng/popover';

export const INPUT_COLOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputSvgColorComponent),
  multi: true,
};

@Component({
  selector: 'input-svg-color',
  standalone: false,
  templateUrl: './input-svg-color.component.html',
  styleUrl: './input-svg-color.component.scss',
  providers: [INPUT_COLOR_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'w-100 p-component p-inputnumber p-inputwrapper p-inputwrapper-filled' },
})
export class InputSvgColorComponent implements ControlValueAccessor {
  protected readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  private _value!: string;

  get value(): string {
    return this._value;
  }

  @Input()
  set value(val: string) {
    this._value = val;
    this.onChange(this._value);
  }

  public size = input<'small' | 'large'>();

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this.value = '';
  }
  protected _disabled = false;

  onSelectColor(color: string, op: Popover) {
    this.value = color;
    op.hide();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
    this.value = '';
    this.cd.markForCheck();
  }
}

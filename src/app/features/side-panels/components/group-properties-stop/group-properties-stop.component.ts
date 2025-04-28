import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'group-properties-stop',
  standalone: false,
  templateUrl: './group-properties-stop.component.html',
  styleUrl: './group-properties-stop.component.scss',
})
export class GroupPropertiesStopComponent {
  public readonly form = input.required<FormGroup>();
  public readonly index = input.required<string, number>({
    transform: (value: number): string => {
      return value + '';
    },
  });
}

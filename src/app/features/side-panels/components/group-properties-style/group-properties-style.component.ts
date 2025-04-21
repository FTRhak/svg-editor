import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'group-properties-style',
  standalone: false,
  templateUrl: './group-properties-style.component.html',
  styleUrl: './group-properties-style.component.scss',
})
export class GroupPropertiesStyleComponent {
  public readonly form = input.required<FormGroup>();
}

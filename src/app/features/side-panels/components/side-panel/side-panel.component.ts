import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'side-panel',
  standalone: false,
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'side-panel' },
})
export class SidePanelComponent {}

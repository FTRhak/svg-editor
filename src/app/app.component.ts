import { Component, inject, OnInit } from '@angular/core';
import { CoreModule } from '@core';
import { MainMenuModule } from '@features/main-menu';
import { SidePanelsModule } from '@features/side-panels';
import { StatusbarModule } from '@features/statusbar';
import { PrimeSharedModule, SharedModule } from '@shared';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [CoreModule, SharedModule, PrimeSharedModule, StatusbarModule, MainMenuModule, SidePanelsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: { class: 'dark-theme d-flex flex-column h-100' },
})
export class AppComponent implements OnInit {
  public readonly title = 'SVG Editor';
  private readonly primeng = inject(PrimeNG);

  ngOnInit(): void {
    this.primeng.ripple.set(false);
  }
}

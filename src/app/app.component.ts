import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core';
import { WINDOW } from '@core/injectors';
import { CanvasPanelModule } from '@features/canvas-panel';
import { MainMenuModule } from '@features/main-menu';
import { SidePanelsModule } from '@features/side-panels';
import { StatusbarModule } from '@features/statusbar';
import { PrimeSharedModule, SharedModule } from '@shared';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeSharedModule,
    StatusbarModule,
    MainMenuModule,
    SidePanelsModule,
    CanvasPanelModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: { class: 'dark-theme d-flex flex-column h-100' },
})
export class AppComponent implements OnInit {
  public readonly title = 'SVG Editor';
  private readonly win = inject(WINDOW);
  private readonly primeng = inject(PrimeNG);

  ngOnInit(): void {
    this.primeng.ripple.set(false);
  }

  public onResizeEnd(): void {
    this.win.dispatchEvent(new Event('resize'));
  }
}

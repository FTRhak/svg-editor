import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core';
import { WINDOW } from '@core/injectors';
import { Application } from '@core/services';
import { CanvasPanelModule } from '@features/canvas-panel';
import { MainMenuModule } from '@features/main-menu';
import { SidePanelsModule } from '@features/side-panels';
import { StatusbarModule } from '@features/statusbar';
import { PrimeSharedModule, SharedModule } from '@shared';
import { PrimeNG } from 'primeng/config';
import { debounceTime, fromEvent, map } from 'rxjs';

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
  host: { class: 'd-flex flex-column h-100' }, //dark-theme
})
export class AppComponent implements OnInit {
  public readonly title = 'SVG Editor';
  private readonly win = inject(WINDOW);
  private readonly primeng = inject(PrimeNG);
  private readonly destroyRef = inject(DestroyRef);
  private readonly app = inject(Application);

  ngOnInit(): void {
    this.primeng.ripple.set(false);

    this.bindResizeEvent();
  }

  public onResizeEnd(): void {
    this.win.dispatchEvent(new Event('resize'));
  }

  private bindResizeEvent() {
    fromEvent(this.win, 'resize')
      .pipe(
        debounceTime(100),
        map(() => this.win.document.querySelector('canvas-panel')!.getBoundingClientRect()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((rect: DOMRect) => {
        this.app.setCanvasRect(rect);
      });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CoreModule } from '@core';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public readonly title = 'SVG Editor';
  private readonly primeng = inject(PrimeNG);

  ngOnInit(): void {
    this.primeng.ripple.set(false);
  }
}

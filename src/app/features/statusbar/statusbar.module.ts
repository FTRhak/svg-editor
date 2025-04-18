import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusbarComponent } from './components/statusbar/statusbar.component';

@NgModule({
  declarations: [StatusbarComponent],
  exports: [StatusbarComponent],
  imports: [CommonModule],
})
export class StatusbarModule {}

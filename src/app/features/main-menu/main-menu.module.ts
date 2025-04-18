import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { PrimeSharedModule } from '@shared';

@NgModule({
  declarations: [MainMenuComponent],
  exports: [MainMenuComponent],
  imports: [CommonModule, PrimeSharedModule],
})
export class MainMenuModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application, CreateSvgNodeService } from './services';

@NgModule({
  declarations: [],
  providers: [CreateSvgNodeService, Application],
  imports: [CommonModule],
})
export class CoreModule {}

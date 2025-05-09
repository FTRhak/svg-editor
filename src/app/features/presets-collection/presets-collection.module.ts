import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsService } from './services/collections/collections.service';

@NgModule({
  declarations: [],
  providers: [CollectionsService],
  imports: [CommonModule],
})
export class PresetsCollectionModule {
  public readonly collection = inject(CollectionsService);
}

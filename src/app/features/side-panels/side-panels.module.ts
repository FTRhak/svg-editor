import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimeSharedModule } from '@shared';
import { PropertiesNodeSvgGroupComponent } from './components/properties-node-svg-group/properties-node-svg-group.component';
import { PropertiesNodeSvgComponent } from './components/properties-node-svg/properties-node-svg.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { ViewStructureComponent } from './components/view-structure/view-structure.component';
import { PropertiesNodeSvgPathComponent } from './components/properties-node-svg-path/properties-node-svg-path.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidePanelComponent,
    ViewStructureComponent,
    PropertiesComponent,
    PropertiesNodeSvgComponent,
    PropertiesNodeSvgGroupComponent,
    PropertiesNodeSvgPathComponent,
  ],
  exports: [SidePanelComponent],
  imports: [CommonModule, PrimeSharedModule, ReactiveFormsModule],
})
export class SidePanelsModule {}

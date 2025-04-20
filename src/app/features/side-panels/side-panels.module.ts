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
import { PropertiesNodeSvgRectComponent } from './components/properties-node-svg-rect/properties-node-svg-rect.component';
import { FieldLockDirective } from './directives/field-lock/field-lock.directive';

@NgModule({
  declarations: [
    SidePanelComponent,
    ViewStructureComponent,
    PropertiesComponent,
    PropertiesNodeSvgComponent,
    PropertiesNodeSvgGroupComponent,
    PropertiesNodeSvgPathComponent,
    PropertiesNodeSvgRectComponent,
    FieldLockDirective,
  ],
  exports: [SidePanelComponent],
  imports: [CommonModule, PrimeSharedModule, ReactiveFormsModule],
})
export class SidePanelsModule {}

import { CdkListboxModule } from '@angular/cdk/listbox';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputColorModule } from '@features/input-color';
import { PrimeSharedModule, SharedModule } from '@shared';
import { PanelActionsComponent } from './components/panel-actions/panel-actions.component';
import {
  GroupPathPropertyCommandsComponent,
  GroupPathPropertyNodeCommandsComponent,
  GroupPropertiesStopComponent,
  GroupPropertiesStyleComponent,
  PanelPropertiesComponent,
  PropertiesNodeSvgCircleComponent,
  PropertiesNodeSvgComponent,
  PropertiesNodeSvgEllipseComponent,
  PropertiesNodeSvgGroupComponent,
  PropertiesNodeSvgLinearGradientComponent,
  PropertiesNodeSvgLineComponent,
  PropertiesNodeSvgPathComponent,
  PropertiesNodeSvgRadialGradientComponent,
  PropertiesNodeSvgRectComponent,
  PropertiesNodeSvgTextComponent,
} from './components/properties';
import {
  PathNodesAComponent,
  PathNodesCComponent,
  PathNodesHComponent,
  PathNodesLComponent,
  PathNodesMComponent,
  PathNodesQComponent,
  PathNodesSComponent,
  PathNodesTComponent,
  PathNodesVComponent,
  PathNodesZComponent,
} from './components/properties/path-nodes';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { ViewStructureComponent } from './components/view-structure/view-structure.component';
import { FieldLockDirective } from './directives/field-lock/field-lock.directive';

@NgModule({
  declarations: [
    SidePanelComponent,
    ViewStructureComponent,
    PanelPropertiesComponent,
    PropertiesNodeSvgComponent,
    PropertiesNodeSvgGroupComponent,
    PropertiesNodeSvgPathComponent,
    PropertiesNodeSvgRectComponent,
    FieldLockDirective,
    PropertiesNodeSvgCircleComponent,
    PropertiesNodeSvgEllipseComponent,
    PropertiesNodeSvgLineComponent,
    GroupPropertiesStyleComponent,
    PropertiesNodeSvgLinearGradientComponent,
    PropertiesNodeSvgRadialGradientComponent,
    GroupPropertiesStopComponent,
    PropertiesNodeSvgTextComponent,
    PathNodesMComponent,
    PathNodesAComponent,
    PathNodesCComponent,
    PathNodesHComponent,
    PathNodesLComponent,
    PathNodesQComponent,
    PathNodesSComponent,
    PathNodesTComponent,
    PathNodesVComponent,
    PathNodesZComponent,
    GroupPathPropertyCommandsComponent,
    GroupPathPropertyNodeCommandsComponent,
    PanelActionsComponent,
  ],
  exports: [SidePanelComponent],
  imports: [CommonModule, CdkListboxModule, PrimeSharedModule, SharedModule, ReactiveFormsModule, InputColorModule],
})
export class SidePanelsModule {}

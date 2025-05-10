import { CdkListboxModule } from '@angular/cdk/listbox';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputColorModule } from '@features/input-color';
import { PrimeSharedModule, SharedModule } from '@shared';
import { GroupPathPropertyCommandsComponent } from './components/group-path-property-commands/group-path-property-commands.component';
import { GroupPropertiesStopComponent } from './components/group-properties-stop/group-properties-stop.component';
import { GroupPropertiesStyleComponent } from './components/group-properties-style/group-properties-style.component';
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
} from './components/path-nodes';
import { PropertiesNodeSvgCircleComponent } from './components/properties-node-svg-circle/properties-node-svg-circle.component';
import { PropertiesNodeSvgEllipseComponent } from './components/properties-node-svg-ellipse/properties-node-svg-ellipse.component';
import { PropertiesNodeSvgGroupComponent } from './components/properties-node-svg-group/properties-node-svg-group.component';
import { PropertiesNodeSvgLineComponent } from './components/properties-node-svg-line/properties-node-svg-line.component';
import { PropertiesNodeSvgLinearGradientComponent } from './components/properties-node-svg-linear-gradient/properties-node-svg-linear-gradient.component';
import { PropertiesNodeSvgPathComponent } from './components/properties-node-svg-path/properties-node-svg-path.component';
import { PropertiesNodeSvgRadialGradientComponent } from './components/properties-node-svg-radial-gradient/properties-node-svg-radial-gradient.component';
import { PropertiesNodeSvgRectComponent } from './components/properties-node-svg-rect/properties-node-svg-rect.component';
import { PropertiesNodeSvgTextComponent } from './components/properties-node-svg-text/properties-node-svg-text.component';
import { PropertiesNodeSvgComponent } from './components/properties-node-svg/properties-node-svg.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { ViewStructureComponent } from './components/view-structure/view-structure.component';
import { FieldLockDirective } from './directives/field-lock/field-lock.directive';
import { PanelActionsComponent } from './components/panel-actions/panel-actions.component';

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
    PanelActionsComponent,
  ],
  exports: [SidePanelComponent],
  imports: [CommonModule, CdkListboxModule, PrimeSharedModule, SharedModule, ReactiveFormsModule, InputColorModule],
})
export class SidePanelsModule {}

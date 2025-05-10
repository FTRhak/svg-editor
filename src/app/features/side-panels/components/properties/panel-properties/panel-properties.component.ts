import { Component, DestroyRef, inject, OnInit, signal, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '@core/services';
import { SVGNodeType, SVGRootModel, TreeNodeModel } from '@libs';
import { fromEvent } from 'rxjs';
import { PropertiesNodeSvgCircleComponent } from '../properties-node-svg-circle/properties-node-svg-circle.component';
import { PropertiesNodeSvgEllipseComponent } from '../properties-node-svg-ellipse/properties-node-svg-ellipse.component';
import { PropertiesNodeSvgGroupComponent } from '../properties-node-svg-group/properties-node-svg-group.component';
import { PropertiesNodeSvgLineComponent } from '../properties-node-svg-line/properties-node-svg-line.component';
import { PropertiesNodeSvgLinearGradientComponent } from '../properties-node-svg-linear-gradient/properties-node-svg-linear-gradient.component';
import { PropertiesNodeSvgPathComponent } from '../properties-node-svg-path/properties-node-svg-path.component';
import { PropertiesNodeSvgRadialGradientComponent } from '../properties-node-svg-radial-gradient/properties-node-svg-radial-gradient.component';
import { PropertiesNodeSvgRectComponent } from '../properties-node-svg-rect/properties-node-svg-rect.component';
import { PropertiesNodeSvgTextComponent } from '../properties-node-svg-text/properties-node-svg-text.component';
import { PropertiesNodeSvgComponent } from '../properties-node-svg/properties-node-svg.component';

@Component({
  selector: 'panel-properties',
  standalone: false,
  templateUrl: './panel-properties.component.html',
  styleUrl: './panel-properties.component.scss',
})
export class PanelPropertiesComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);
  private readonly viewContainer = inject(ViewContainerRef);

  public nodeId = signal<string>('');

  public ngOnInit(): void {
    fromEvent<[SVGRootModel, TreeNodeModel]>(this.project.events, 'project:item:selected')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item]) => {
        this.viewContainer.clear();
        let component: any;
        switch (item?._type) {
          case SVGNodeType.GROUP:
            component = this.viewContainer.createComponent(PropertiesNodeSvgGroupComponent);
            break;
          case SVGNodeType.SVG:
            component = this.viewContainer.createComponent(PropertiesNodeSvgComponent);
            break;
          case SVGNodeType.PATH:
            component = this.viewContainer.createComponent(PropertiesNodeSvgPathComponent);
            break;
          case SVGNodeType.RECT:
            component = this.viewContainer.createComponent(PropertiesNodeSvgRectComponent);
            break;
          case SVGNodeType.CIRCLE:
            component = this.viewContainer.createComponent(PropertiesNodeSvgCircleComponent);
            break;
          case SVGNodeType.ELLIPSE:
            component = this.viewContainer.createComponent(PropertiesNodeSvgEllipseComponent);
            break;
          case SVGNodeType.LINE:
            component = this.viewContainer.createComponent(PropertiesNodeSvgLineComponent);
            break;
          case SVGNodeType.TEXT:
            component = this.viewContainer.createComponent(PropertiesNodeSvgTextComponent);
            break;
          case SVGNodeType.LINEAR_GRADIENT:
            component = this.viewContainer.createComponent(PropertiesNodeSvgLinearGradientComponent);
            break;
          case SVGNodeType.RADIAL_GRADIENT:
            component = this.viewContainer.createComponent(PropertiesNodeSvgRadialGradientComponent);
            break;
        }

        if (component) {
          this.nodeId.set(item._id);
          component.setInput('node', item);
        }
      });
  }
}

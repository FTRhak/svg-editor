import { Component, DestroyRef, inject, OnInit, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '@core/services';
import { SVGNodeType, SVGRootModel, TreeNodeModel } from '@libs';
import { fromEvent } from 'rxjs';
import { PropertiesNodeSvgCircleComponent } from '../properties-node-svg-circle/properties-node-svg-circle.component';
import { PropertiesNodeSvgEllipseComponent } from '../properties-node-svg-ellipse/properties-node-svg-ellipse.component';
import { PropertiesNodeSvgGroupComponent } from '../properties-node-svg-group/properties-node-svg-group.component';
import { PropertiesNodeSvgPathComponent } from '../properties-node-svg-path/properties-node-svg-path.component';
import { PropertiesNodeSvgRectComponent } from '../properties-node-svg-rect/properties-node-svg-rect.component';
import { PropertiesNodeSvgComponent } from '../properties-node-svg/properties-node-svg.component';
import { PropertiesNodeSvgLineComponent } from '../properties-node-svg-line/properties-node-svg-line.component';

@Component({
  selector: 'properties',
  standalone: false,
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);
  private readonly viewContainer = inject(ViewContainerRef);

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
        }

        if (component) {
          component.setInput('node', item);
        }
      });
  }
}

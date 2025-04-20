import { Component, DestroyRef, inject, OnInit, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '@core/services';
import { SVGNodeType, SVGRootModel, TreeNodeModel } from '@libs';
import { fromEvent } from 'rxjs';
import { PropertiesNodeSvgGroupComponent } from '../properties-node-svg-group/properties-node-svg-group.component';
import { PropertiesNodeSvgPathComponent } from '../properties-node-svg-path/properties-node-svg-path.component';
import { PropertiesNodeSvgComponent } from '../properties-node-svg/properties-node-svg.component';

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

        switch (item?._type) {
          case SVGNodeType.GROUP:
            this.viewContainer.createComponent(PropertiesNodeSvgGroupComponent);
            break;
          case SVGNodeType.SVG:
            this.viewContainer.createComponent(PropertiesNodeSvgComponent);
            break;
          case SVGNodeType.PATH:
            this.viewContainer.createComponent(PropertiesNodeSvgPathComponent);
            break;
        }
      });
  }
}

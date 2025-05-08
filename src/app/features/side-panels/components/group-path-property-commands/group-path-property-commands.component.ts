import { Component, DestroyRef, inject, input, signal, ViewContainerRef } from '@angular/core';
import { ProjectService } from '@core/services';
import { SVGPathModel, SVGPathNodeModel } from '@libs';
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
} from '../path-nodes';

@Component({
  selector: 'group-path-property-commands',
  standalone: false,
  templateUrl: './group-path-property-commands.component.html',
  styleUrl: './group-path-property-commands.component.scss',
})
export class GroupPathPropertyCommandsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);
  private readonly viewContainer = inject(ViewContainerRef);

  public readonly node = input.required<SVGPathModel, SVGPathModel>({
    transform: (v) => {
      //this.buildListCommand(v);
      this.path.set(v.dArray);
      return v;
    },
  });

  public path = signal<SVGPathNodeModel[]>([]);

  private buildListCommand(path: SVGPathModel) {
    this.viewContainer.clear();
    const list = document.createElement('ul');
    //list.classList.add('list-group');
    //this.viewContainer.element.appendChild(list);

    path.dArray.forEach((d: SVGPathNodeModel) => {
      switch (d.type) {
        case 'A':
          this.viewContainer.createComponent(PathNodesAComponent);
          break;
        case 'C':
          this.viewContainer.createComponent(PathNodesCComponent);
          break;
        case 'H':
          this.viewContainer.createComponent(PathNodesHComponent);
          break;
        case 'L':
          this.viewContainer.createComponent(PathNodesLComponent);
          break;
        case 'M':
          this.viewContainer.createComponent(PathNodesMComponent);
          break;
        case 'Q':
          this.viewContainer.createComponent(PathNodesQComponent);
          break;
        case 'S':
          this.viewContainer.createComponent(PathNodesSComponent);
          break;
        case 'T':
          this.viewContainer.createComponent(PathNodesTComponent);
          break;
        case 'V':
          this.viewContainer.createComponent(PathNodesVComponent);
          break;

        case 'Z':
          this.viewContainer.createComponent(PathNodesZComponent);
          break;
      }
    });
    //this.viewContainer.createComponent(PropertiesNodeSvgGroupComponent);
  }
}

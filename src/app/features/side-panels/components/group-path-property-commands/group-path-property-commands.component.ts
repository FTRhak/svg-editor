import { Component, DestroyRef, inject, input, signal, ViewContainerRef } from '@angular/core';
import { ProjectService } from '@core/services';
import { PID, SVGPathModel, SVGPathNodeModel } from '@libs';

@Component({
  selector: 'group-path-property-commands',
  standalone: false,
  templateUrl: './group-path-property-commands.component.html',
  styleUrl: './group-path-property-commands.component.scss',
  host: { class: 'group-path-property-commands' },
})
export class GroupPathPropertyCommandsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);
  private readonly viewContainer = inject(ViewContainerRef);

  public readonly node = input.required<SVGPathModel, SVGPathModel>({
    transform: (v) => {
      this.path.set(v.dArray);
      return v;
    },
  });

  public path = signal<SVGPathNodeModel[]>([]);

  public onChange([pathNodeId, propertyName, value]: [PID, string, any]) {
    this.project.setNodePropertyPathItem(this.node()._id, pathNodeId, propertyName, value);
  }
}

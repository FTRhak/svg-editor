import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { ProjectService } from '@core/services';
import { PID, SVGPathNodeModel, SVGPathNodeZModel } from '@libs';

@Component({
  selector: 'path-nodes-z',
  standalone: false,
  templateUrl: './path-nodes-z.component.html',
  styleUrl: './path-nodes-z.component.scss',
})
export class PathNodesZComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly pathId = input.required<PID>();
  public node = input.required<SVGPathNodeZModel | SVGPathNodeModel>();
  public readonly changeNode = output<[PID, string, any]>();

  public onToggleType() {
    this.changeNode.emit([this.node().id, 'isLocal', !this.node().isLocal]);
  }
}

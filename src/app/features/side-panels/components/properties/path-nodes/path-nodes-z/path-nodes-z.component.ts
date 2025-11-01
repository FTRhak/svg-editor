import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { PID, SVGPathNodeModel, SVGPathNodeZModel } from '@libs';
import { PathNodesDPropertyModel } from '../path-nodes-d-property.model';

@Component({
  selector: 'path-nodes-z',
  standalone: false,
  templateUrl: './path-nodes-z.component.html',
  styleUrl: './path-nodes-z.component.scss',
})
export class PathNodesZComponent extends PathNodesDPropertyModel {
  protected override readonly destroyRef = inject(DestroyRef);

  public readonly pathId = input.required<PID>();
  public override node = input.required<SVGPathNodeZModel | SVGPathNodeModel>();
  public override readonly changeNode = output<[PID, string, any]>();
}

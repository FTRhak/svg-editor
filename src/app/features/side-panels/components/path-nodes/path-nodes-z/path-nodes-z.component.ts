import { Component, input } from '@angular/core';
import { SVGPathNodeModel, SVGPathNodeZModel } from '@libs';

@Component({
  selector: 'path-nodes-z',
  standalone: false,
  templateUrl: './path-nodes-z.component.html',
  styleUrl: './path-nodes-z.component.scss',
})
export class PathNodesZComponent {
  public node = input.required<SVGPathNodeZModel | SVGPathNodeModel>();
}

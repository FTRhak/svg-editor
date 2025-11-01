import { Component, inject, input } from '@angular/core';
import { ProjectService } from '@core/services';
import { PID, SVGPathNodeType } from '@libs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'group-path-property-node-commands',
  standalone: false,
  templateUrl: './group-path-property-node-commands.component.html',
  styleUrl: './group-path-property-node-commands.component.scss',
})
export class GroupPathPropertyNodeCommandsComponent {
  private readonly project = inject(ProjectService);

  public readonly nodeId = input.required<PID>();
  public readonly pathItem = input.required<any>();

  public readonly menuAvtions: MenuItem[] = [
    {
      styleClass: 'action-menu-button',
      items: [
        {
          label: 'Add next',
          items: [
            {
              label: 'Move (M) node',
              command: () => {
                this.addNode('m0,0');
              },
            },
            {
              label: 'Line (L) node',
              command: () => {
                this.addNode('l0,0');
              },
            },
            {
              label: 'Horizantal Line (H) node',
              command: () => {
                this.addNode('h0');
              },
            },
            {
              label: 'Vertical Line (V) node',
              command: () => {
                this.addNode('v0');
              },
            },
            {
              label: 'Curve (C) node',
              command: () => {
                this.addNode('c0,0,1,1,2,2');
              },
            },
            {
              label: 'Smooth Curve (S) node',
              command: () => {
                this.addNode('s0,1,1,0');
              },
            },
            {
              label: 'Smooth quadratic Bézier curve (T) node',
              command: () => {
                this.addNode('t1,0');
              },
            },
            {
              label: 'Quadratic Bézier curve (Q) node',
              command: () => {
                this.addNode('q2,0,1,1');
              },
            },
            {
              label: 'Elliptical (A) node',
              command: () => {
                this.addNode('a1,1,1,0,1,2,2');
              },
            },
            {
              label: 'Close (Z) node',
              command: () => {
                this.addNode('z');
              },
            },
          ],
        },
        {
          label: 'Remove',
          command: (ev) => {
            this.removeNode();
          },
        },
      ],
    },
  ];

  public onChange([pathNodeId, propertyName, value]: [PID, string, any]) {
    console.log(this.nodeId(), pathNodeId, propertyName, value);
    this.project.setNodePropertyPathItem(this.nodeId(), pathNodeId, propertyName, value);
  }

  public addNode(dPathPart: string) {
    this.project.addNodePropertyPathItem(this.nodeId(), this.pathItem().id, dPathPart);
  }

  public removeNode() {
    this.project.removeNodePropertyPathItem(this.nodeId(), this.pathItem().id);
  }
}

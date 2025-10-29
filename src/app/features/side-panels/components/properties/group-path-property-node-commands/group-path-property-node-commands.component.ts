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

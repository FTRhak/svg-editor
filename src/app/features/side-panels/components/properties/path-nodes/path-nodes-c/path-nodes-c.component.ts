import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { PID, SVGPathNodeCModel, SVGPathNodeModel } from '@libs';

@Component({
  selector: 'path-nodes-c',
  standalone: false,
  templateUrl: './path-nodes-c.component.html',
  styleUrl: './path-nodes-c.component.scss',
})
export class PathNodesCComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly pathId = input.required<PID>();
  public node = input.required<SVGPathNodeCModel | SVGPathNodeModel>();
  public readonly changeNode = output<[PID, string, any]>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeCModel;

    this.form = new FormGroup({
      x1: new FormControl({ value: node.x1 || 0, disabled: false }),
      y1: new FormControl({ value: node.y1 || 0, disabled: false }),
      x2: new FormControl({ value: node.x2 || 0, disabled: false }),
      y2: new FormControl({ value: node.y2 || 0, disabled: false }),
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }

  public onToggleType() {
    this.changeNode.emit([this.node().id, 'isLocal', !this.node().isLocal]);
  }
}

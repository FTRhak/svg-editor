import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { PID, SVGPathNodeModel, SVGPathNodeSModel } from '@libs';

@Component({
  selector: 'path-nodes-s',
  standalone: false,
  templateUrl: './path-nodes-s.component.html',
  styleUrl: './path-nodes-s.component.scss',
})
export class PathNodesSComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly pathId = input.required<PID>();
  public node = input.required<SVGPathNodeSModel | SVGPathNodeModel>();
  public readonly changeNode = output<[PID, string, any]>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeSModel;

    this.form = new FormGroup({
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

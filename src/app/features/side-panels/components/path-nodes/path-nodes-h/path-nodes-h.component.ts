import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { PID, SVGPathNodeHModel, SVGPathNodeModel } from '@libs';

@Component({
  selector: 'path-nodes-h',
  standalone: false,
  templateUrl: './path-nodes-h.component.html',
  styleUrl: './path-nodes-h.component.scss',
})
export class PathNodesHComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly pathId = input.required<PID>();
  public node = input.required<SVGPathNodeHModel | SVGPathNodeModel>();
  public readonly changeNode = output<[PID, string, any]>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeHModel;

    this.form = new FormGroup({
      x: new FormControl({ value: node.x || 0, disabled: false }),
    });
  }

  public onToggleType() {
    this.changeNode.emit([this.node().id, 'isLocal', !this.node().isLocal]);
  }
}

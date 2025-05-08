import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { PID, SVGPathNodeModel, SVGPathNodeVModel } from '@libs';

@Component({
  selector: 'path-nodes-v',
  standalone: false,
  templateUrl: './path-nodes-v.component.html',
  styleUrl: './path-nodes-v.component.scss',
})
export class PathNodesVComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly pathId = input.required<PID>();
  public node = input.required<SVGPathNodeVModel | SVGPathNodeModel>();
  public readonly changeNode = output<[PID, string, any]>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeVModel;

    this.form = new FormGroup({
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });
  }

  public onToggleType() {
    this.changeNode.emit([this.node().id, 'isLocal', !this.node().isLocal]);
  }
}

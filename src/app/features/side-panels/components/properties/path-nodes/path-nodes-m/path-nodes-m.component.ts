import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { PID, SVGPathNodeMModel, SVGPathNodeModel, SVGRootModel, TreeNodeModel } from '@libs';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'path-nodes-m',
  standalone: false,
  templateUrl: './path-nodes-m.component.html',
  styleUrl: './path-nodes-m.component.scss',
})
export class PathNodesMComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly pathId = input.required<PID>();
  public readonly node = input.required<SVGPathNodeMModel | SVGPathNodeModel>();
  public readonly changeNode = output<[PID, string, any]>();

  public form!: FormGroup;

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeMModel;

    this.form = new FormGroup({
      x: new FormControl({ value: node.x || 0, disabled: false }),
      y: new FormControl({ value: node.y || 0, disabled: false }),
    });

    const rawValue = this.form.getRawValue();
    const properties = Object.keys(rawValue);

    for (const property of properties) {
      this.form
        .get(property)
        ?.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          this.changeNode.emit([this.node().id, property, value]);
        });
    }

    fromEvent<[SVGRootModel, TreeNodeModel, SVGPathNodeModel, string, any]>(
      this.project.events,
      'project:item-path:updated',
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, item, pathNode, propertyName, value]) => {
        // TODO
        //console.log('==CH:', project, item, pathNode, propertyName, value);
        //this.form.setValue({ ...this.form.getRawValue(), [propertyName]: value } as any, { emitEvent: false });
      });
  }

  public onToggleType() {
    this.changeNode.emit([this.node().id, 'isLocal', !this.node().isLocal]);
  }
}

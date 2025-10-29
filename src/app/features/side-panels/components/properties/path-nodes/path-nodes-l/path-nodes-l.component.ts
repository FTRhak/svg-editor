import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services';
import { PID, SVGPathNodeLModel, SVGPathNodeModel } from '@libs';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'path-nodes-l',
  standalone: false,
  templateUrl: './path-nodes-l.component.html',
  styleUrl: './path-nodes-l.component.scss',
})
export class PathNodesLComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);

  public readonly pathId = input.required<PID>();
  public node = input.required<SVGPathNodeLModel | SVGPathNodeModel>();
  public readonly x = input.required<number>();
  public readonly y = input.required<number>();

  public readonly changeNode = output<[PID, string, any]>();

  public form!: FormGroup;

  constructor() {
    effect(() => {
      const x = this.x();
      const y = this.y();
      this.form.get('x')?.setValue(x, { emitEvent: false });
      this.form.get('y')?.setValue(y, { emitEvent: false });
    });
  }

  public ngOnInit(): void {
    const node = this.node() as SVGPathNodeLModel;

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
  }

  public onToggleType() {
    this.changeNode.emit([this.node().id, 'isLocal', !this.node().isLocal]);
  }
}

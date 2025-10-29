import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '@core/services';
import { PID, SVGPathModel, SVGPathNodeMModel, SVGPathNodeModel, SVGRootModel, TreeNodeModel } from '@libs';
import { MenuItem } from 'primeng/api';
import { debounceTime, distinct, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'group-path-property-commands',
  standalone: false,
  templateUrl: './group-path-property-commands.component.html',
  styleUrl: './group-path-property-commands.component.scss',
  host: { class: 'group-path-property-commands' },
})
export class GroupPathPropertyCommandsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly project = inject(ProjectService);
  private readonly viewContainer = inject(ViewContainerRef);
  private cdRef = inject(ChangeDetectorRef);

  public readonly node = input.required<SVGPathModel, SVGPathModel>({
    transform: (v) => {
      this.path.set(v.dArray);
      //console.log(v.dArray);
      return v;
    },
  });

  public path = signal<any[]>([]); // SVGPathNodeMModel | SVGPathNodeModel

  ngOnInit(): void {
    // Listen for path node updates
    fromEvent<[SVGRootModel, SVGPathModel, string, any]>(this.project.events, 'project:item:updated')
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(100), distinctUntilChanged())
      .subscribe(([project, item, shift]) => {
        this.path.set(item.dArray);
        this.cdRef.detectChanges();
      });
  }

  //public onChange([pathNodeId, propertyName, value]: [PID, string, any]) {
  //  this.project.setNodePropertyPathItem(this.node()._id, pathNodeId, propertyName, value);
  //}
}

import { Component, DestroyRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '@core/services';
import { TreeItem, PID, SVGRootModel, TreeNodeModel, SVGNodeType } from '@libs';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'view-structure',
  standalone: false,
  templateUrl: './view-structure.component.html',
  styleUrl: './view-structure.component.scss',
})
export class ViewStructureComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private project = inject(ProjectService);

  public readonly MENU_ITEM_ADD_SVG: MenuItem[] = [
    {
      label: 'Group',
      type: SVGNodeType.GROUP,
      command: (ev: { item: { type: SVGNodeType }; originalEvent: Event }) => {
        this.selectedItem && this.project.addChildItem(this.selectedItem.id, ev.item.type);
      },
    },
    {
      label: 'Path',
      type: SVGNodeType.PATH,
      command: (ev: { item: { type: SVGNodeType }; originalEvent: Event }) => {
        this.selectedItem && this.project.addChildItem(this.selectedItem.id, ev.item.type);
      },
    },
  ];
  public readonly MENU_ITEM_ADD_GROUP: MenuItem[] = [
    {
      label: 'Group',
      type: SVGNodeType.GROUP,
      command: (ev: { item: { type: SVGNodeType }; originalEvent: Event }) => {
        this.selectedItem && this.project.addChildItem(this.selectedItem.id, ev.item.type);
      },
    },
    {
      label: 'Path',
      type: SVGNodeType.PATH,
      command: (ev: { item: { type: SVGNodeType }; originalEvent: Event }) => {
        this.selectedItem && this.project.addChildItem(this.selectedItem.id, ev.item.type);
      },
    },
  ];

  public readonly MENU_ITEM_REMOVE: MenuItem = {
    label: 'Remove',
    command: (ev: { item: { type: SVGNodeType }; originalEvent: Event }) => {
      this.selectedItem && this.project.removeItem(this.selectedItem.id);
    },
  };

  public readonly menuItems = signal<MenuItem[]>([]);

  public readonly items = signal<TreeItem[]>([]);

  @ViewChild('cm') cm!: ContextMenu;

  selectedItem: TreeItem | undefined;

  public ngOnInit(): void {
    fromEvent<[SVGRootModel, any[]]>(this.project.events, 'project:tree:updates')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([project, list]) => {
        this.items.set([project.toTree()]);
      });
  }

  onChange(itemId: any) {
    this.project.selectItem(this.selectedItem?.id || null);
  }

  onContextMenu(event: any) {
    console.log('onContextMenu:', event.originalEvent.currentTarget);
    const menu: MenuItem[] = [];

    switch (event.node.typeName) {
      case SVGNodeType.SVG:
        menu.push({
          label: 'Add',
          items: [...this.MENU_ITEM_ADD_SVG],
        });
        break;
      case SVGNodeType.GROUP:
        menu.push({
          label: 'Add',
          items: [...this.MENU_ITEM_ADD_GROUP],
        });
        menu.push({ ...this.MENU_ITEM_REMOVE });
        break;
      case SVGNodeType.PATH:
        menu.push({ ...this.MENU_ITEM_REMOVE });
        break;
    }
    this.menuItems.set(menu);

    //this.cm.target = event.originalEvent.currentTarget;
    this.cm.show(event.originalEvent);
  }
}

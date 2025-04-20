import { Component, DestroyRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '@core/services';
import { SVGNodeType, SVGRootModel, TreeItem } from '@libs';
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

  private readonly ADD_GROUP = {
    label: 'Group',
    type: SVGNodeType.GROUP,
    command: (ev: { item: { type: SVGNodeType }; originalEvent: Event }) => {
      this.selectedItem && this.project.addChildItem(this.selectedItem.id, ev.item.type);
    },
  };

  private readonly ADD_RECT = {
    label: 'Rect',
    type: SVGNodeType.RECT,
    command: (ev: { item: { type: SVGNodeType }; originalEvent: Event }) => {
      this.selectedItem &&
        this.project.addChildItem(this.selectedItem.id, ev.item.type, { x: 0, y: 0, width: 1, height: 1 });
    },
  };

  private readonly ADD_PATH = {
    label: 'Path',
    type: SVGNodeType.PATH,
    command: (ev: { item: { type: SVGNodeType }; originalEvent: Event }) => {
      this.selectedItem && this.project.addChildItem(this.selectedItem.id, ev.item.type);
    },
  };

  private readonly MENU_ITEM_ADD_SVG: MenuItem[] = [{ ...this.ADD_GROUP }, { ...this.ADD_PATH }, { ...this.ADD_RECT }];
  private readonly MENU_ITEM_ADD_GROUP: MenuItem[] = [
    { ...this.ADD_GROUP },
    { ...this.ADD_PATH },
    { ...this.ADD_RECT },
  ];

  private readonly MENU_ITEM_REMOVE: MenuItem = {
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
      case SVGNodeType.RECT:
        menu.push({ ...this.MENU_ITEM_REMOVE });
        break;
    }
    this.menuItems.set(menu);

    //this.cm.target = event.originalEvent.currentTarget;
    this.cm.show(event.originalEvent);
  }
}

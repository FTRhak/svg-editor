import { Component, DestroyRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '@core/services';
import { PID, SVGNodeType, SVGRootModel, TreeItem } from '@libs';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { TreeNodeContextMenuSelectEvent } from 'primeng/tree';
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

  private readonly ADD_DEFS = {
    label: 'Definitions',
    type: SVGNodeType.DEFS,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id && this.project.addChildItem(id, ev.item.type);
    },
  };

  /*private readonly ADD_USE = {
    label: 'Use',
    type: SVGNodeType.USE,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id && this.project.addChildItem(id, ev.item.type);
    },
  };*/

  private readonly ADD_LINEAR_GRADIENT = {
    label: 'Linear Gradient',
    type: SVGNodeType.LINEAR_GRADIENT,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id && this.project.addChildItem(id, ev.item.type);
    },
  };

  private readonly ADD_RADIAL_GRADIENT = {
    label: 'Radial Gradient',
    type: SVGNodeType.RADIAL_GRADIENT,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id && this.project.addChildItem(id, ev.item.type);
    },
  };

  private readonly ADD_GROUP = {
    label: 'Group',
    type: SVGNodeType.GROUP,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id && this.project.addChildItem(id, ev.item.type);
    },
  };

  private readonly ADD_RECT = {
    label: 'Rect',
    type: SVGNodeType.RECT,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id && this.project.addChildItem(id, ev.item.type, { x: 0, y: 0, width: 1, height: 1 });
    },
  };

  private readonly ADD_CIRCLE = {
    label: 'Circle',
    type: SVGNodeType.CIRCLE,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id && this.project.addChildItem(id, ev.item.type, { cx: 1, cy: 1, r: 1 });
    },
  };

  private readonly ADD_ELLIPSE = {
    label: 'Ellipse',
    type: SVGNodeType.ELLIPSE,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id && this.project.addChildItem(id, ev.item.type, { cx: 2, cy: 1, rx: 2, ry: 1 });
    },
  };

  private readonly ADD_LINE = {
    label: 'Line',
    type: SVGNodeType.LINE,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id &&
        this.project.addChildItem(id, ev.item.type, { x1: 0, y1: 0, x2: 1, y2: 1, stroke: 'black', strokeWidth: 0.1 });
    },
  };

  private readonly ADD_PATH = {
    label: 'Path',
    type: SVGNodeType.PATH,
    command: (ev: { item: { idRef: PID; type: SVGNodeType }; originalEvent: Event }) => {
      const id: PID = this.selectedItem?.id || ev.item.idRef;
      id && this.project.addChildItem(id, ev.item.type);
    },
  };

  private readonly MENU_ITEM_ADD_SVG: MenuItem[] = [
    { ...this.ADD_DEFS },
    { ...this.ADD_GROUP },
    { ...this.ADD_PATH },
    { ...this.ADD_RECT },
    { ...this.ADD_CIRCLE },
    { ...this.ADD_ELLIPSE },
    { ...this.ADD_LINE },
  ];

  private readonly MENU_ITEM_ADD_DEFS: MenuItem[] = [
    { ...this.ADD_LINEAR_GRADIENT },
    { ...this.ADD_RADIAL_GRADIENT },
    { ...this.ADD_PATH },
    { ...this.ADD_RECT },
    { ...this.ADD_CIRCLE },
    { ...this.ADD_ELLIPSE },
    { ...this.ADD_LINE },
  ];

  private readonly MENU_ITEM_ADD_GROUP: MenuItem[] = [
    { ...this.ADD_GROUP },
    { ...this.ADD_PATH },
    { ...this.ADD_RECT },
    { ...this.ADD_CIRCLE },
    { ...this.ADD_ELLIPSE },
    { ...this.ADD_LINE },
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

  onContextMenu(event: TreeNodeContextMenuSelectEvent) {
    const menu: MenuItem[] = [];

    switch ((event.node as TreeItem).typeName) {
      case SVGNodeType.SVG:
        menu.push({
          label: 'Add',
          items: this.MENU_ITEM_ADD_SVG.map((item) => ({ ...item, idRef: (event.node as TreeItem).id })),
        });
        break;
      case SVGNodeType.DEFS:
        menu.push({
          label: 'Add',
          items: this.MENU_ITEM_ADD_DEFS.map((item) => ({ ...item, idRef: (event.node as TreeItem).id })),
        });
        break;
      case SVGNodeType.GROUP:
        menu.push({
          label: 'Add',
          items: this.MENU_ITEM_ADD_GROUP.map((item) => ({ ...item, idRef: (event.node as TreeItem).id })),
        });
        menu.push({ ...this.MENU_ITEM_REMOVE, idRef: (event.node as TreeItem).id });
        break;
      case SVGNodeType.PATH:
        menu.push({ ...this.MENU_ITEM_REMOVE, idRef: (event.node as TreeItem).id });
        break;
      case SVGNodeType.RECT:
        menu.push({ ...this.MENU_ITEM_REMOVE, idRef: (event.node as TreeItem).id });
        break;
    }
    this.menuItems.set(menu);
  }
}

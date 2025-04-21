import { Directive, inject, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

@Directive({
  selector: '[treeContextmenuNoSelection]',
  standalone: false,
})
export class TreeContextmenuNoSelectionDirective implements OnInit {
  private readonly tree = inject(Tree, { self: true });

  ngOnInit(): void {
    this.tree.onNodeRightClick = function (event: MouseEvent, node: TreeNode<any>) {
      if (this.contextMenu) {
        let eventTarget = <Element>event.target;

        if (eventTarget.className && eventTarget.className.indexOf('p-tree-toggler') === 0) {
          return;
        } else {
          this.contextMenu.show(event);
          this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
        }
      }
    };
  }
}

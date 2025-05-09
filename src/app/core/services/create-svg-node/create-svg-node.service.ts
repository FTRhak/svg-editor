import { inject, Injectable } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { PID, SVGNodeType } from '@libs';

@Injectable()
export class CreateSvgNodeService {
  private project = inject(ProjectService);

  createRectDef(parentId?: PID) {
    this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.RECT, {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    });
  }

  createCircleDef(parentId?: PID) {
    this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.CIRCLE, { cx: 1, cy: 1, r: 1 });
  }

  createEllipseDef(parentId?: PID) {
    this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.ELLIPSE, {
      cx: 2,
      cy: 1,
      rx: 2,
      ry: 1,
    });
  }

  createLineDef(parentId?: PID) {
    this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.LINE, {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
      stroke: 'black',
      strokeWidth: 0.1,
    });
  }

  createPathDef(parentId?: PID) {
    this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.PATH, {
      d: 'M 0 0 L 1 1',
      stroke: 'black',
      strokeWidth: 0.1,
    });
  }

  createTextDef(parentId?: PID, text: string = 'Text') {
    this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.TEXT, {
      x: 0,
      y: 1,
      style: { 'font-size': 1 },
      text,
    });
  }

  createGroupDef(parentId?: PID) {
    this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.GROUP);
  }

  createDefsLinearGradient() {
    this.project.addDefItem(SVGNodeType.LINEAR_GRADIENT);
  }

  createDefsRadialGradient() {
    this.project.addDefItem(SVGNodeType.RADIAL_GRADIENT);
  }
}

import { inject, Injectable } from '@angular/core';
import {
  PID,
  SVGCircleModel,
  SVGEllipseModel,
  SVGGroupModel,
  SVGLinearGradientModel,
  SVGLineModel,
  SVGNodeType,
  SVGPathModel,
  SVGRadialGradientModel,
  SVGRectModel,
  SVGTextModel,
  TreeNodeModel,
} from '@libs';
import { ProjectService } from '../project/project.service';

@Injectable()
export class CreateSvgNodeService {
  private readonly project = inject(ProjectService);

  public createDefaultRect(parentId?: PID): SVGRectModel | TreeNodeModel | null {
    return this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.RECT, {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    });
  }

  public createDefaultCircle(parentId?: PID): SVGCircleModel | TreeNodeModel | null {
    return this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.CIRCLE, {
      cx: 1,
      cy: 1,
      r: 1,
    });
  }

  public createDefaultEllipse(parentId?: PID): SVGEllipseModel | TreeNodeModel | null {
    return this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.ELLIPSE, {
      cx: 2,
      cy: 1,
      rx: 2,
      ry: 1,
    });
  }

  public createDefaultLine(parentId?: PID): SVGLineModel | TreeNodeModel | null {
    return this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.LINE, {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
      stroke: 'black',
      strokeWidth: 0.1,
    });
  }

  public createDefaultPath(parentId?: PID): SVGPathModel | TreeNodeModel | null {
    return this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.PATH, {
      d: 'M 0 0 L 1 1',
      stroke: 'black',
      strokeWidth: 0.1,
    });
  }

  public createDefaultText(parentId?: PID, text: string = 'Text'): SVGTextModel | TreeNodeModel | null {
    return this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.TEXT, {
      x: 0,
      y: 1,
      style: { 'font-size': 1 },
      text,
    });
  }

  public createDefaultGroup(parentId?: PID): SVGGroupModel | TreeNodeModel | null {
    return this.project.addChildItem(parentId || this.project.selectedItemId, SVGNodeType.GROUP);
  }

  public createDefsLinearGradient(): SVGLinearGradientModel | TreeNodeModel | null {
    return this.project.addDefItem(SVGNodeType.LINEAR_GRADIENT);
  }

  public createDefsRadialGradient(): SVGRadialGradientModel | TreeNodeModel | null {
    return this.project.addDefItem(SVGNodeType.RADIAL_GRADIENT);
  }
}

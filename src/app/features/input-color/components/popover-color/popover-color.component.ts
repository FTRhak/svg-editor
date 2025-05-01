import { AfterViewInit, Component, inject, output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectService } from '@core/services';
import { SVGRootModel } from '@libs';

@Component({
  selector: 'popover-color',
  standalone: false,
  templateUrl: './popover-color.component.html',
  styleUrl: './popover-color.component.scss',
})
export class PopoverColorComponent implements AfterViewInit {
  private readonly project = inject(ProjectService);
  private sanitizer = inject(DomSanitizer);

  public colors = ['#ff0000', '#00ff00', '#0000ff'];
  public color = '#000';

  public selectedColor = '#000';

  public select = output<string>();

  public gradientsList: any[] = [];

  ngAfterViewInit(): void {
    const gradients = this.project.defs?.gradients || [];

    gradients.forEach((item) => {
      this.gradientsList.push({
        id: item.id,
        code: this.sanitizer.bypassSecurityTrustHtml(SVGRootModel.previewGradient(item, 150, 50)),
      });
    });
  }

  public onSelectSavedColor(color: string) {
    this.selectedColor = color;
  }

  public onSelectGradient(id: string) {
    this.selectedColor = `url(#${id})`;
  }

  public onSelectColor() {
    this.select.emit(this.selectedColor);
  }
}

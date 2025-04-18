import { Component, inject } from '@angular/core';
import { ProjectService } from '@core/services';

@Component({
  selector: 'main-menu',
  standalone: false,
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  private project = inject(ProjectService);

  public readonly items = [
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.project.createNewProject();
          },
        },
      ],
    },
    {
      label: 'Features',
      icon: 'pi pi-star',
    },
  ];
}

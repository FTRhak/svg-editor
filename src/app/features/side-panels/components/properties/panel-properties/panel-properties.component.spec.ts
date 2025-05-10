import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelPropertiesComponent } from './panel-properties.component';

describe('PanelPropertiesComponent', () => {
  let component: PanelPropertiesComponent;
  let fixture: ComponentFixture<PanelPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelPropertiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

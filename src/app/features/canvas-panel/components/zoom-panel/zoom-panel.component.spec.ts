import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoomPanelComponent } from './zoom-panel.component';

describe('ZoomPanelComponent', () => {
  let component: ZoomPanelComponent;
  let fixture: ComponentFixture<ZoomPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoomPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

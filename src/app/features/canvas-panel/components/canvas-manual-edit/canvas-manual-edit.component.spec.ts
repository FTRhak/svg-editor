import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasManualEditComponent } from './canvas-manual-edit.component';

describe('CanvasManualEditComponent', () => {
  let component: CanvasManualEditComponent;
  let fixture: ComponentFixture<CanvasManualEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasManualEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasManualEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

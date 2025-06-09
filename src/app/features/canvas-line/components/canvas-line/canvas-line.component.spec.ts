import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasLineComponent } from './canvas-line.component';

describe('CanvasLineComponent', () => {
  let component: CanvasLineComponent;
  let fixture: ComponentFixture<CanvasLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasLineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

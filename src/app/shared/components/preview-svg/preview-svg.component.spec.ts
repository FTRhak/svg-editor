import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewSvgComponent } from './preview-svg.component';

describe('PreviewSvgComponent', () => {
  let component: PreviewSvgComponent;
  let fixture: ComponentFixture<PreviewSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSvgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

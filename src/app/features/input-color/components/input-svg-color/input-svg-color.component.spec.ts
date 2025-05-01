import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSvgColorComponent } from './input-svg-color.component';

describe('InputSvgColorComponent', () => {
  let component: InputSvgColorComponent;
  let fixture: ComponentFixture<InputSvgColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSvgColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSvgColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

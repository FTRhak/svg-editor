import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgLinearGradientComponent } from './properties-node-svg-linear-gradient.component';

describe('PropertiesNodeSvgLinearGradientComponent', () => {
  let component: PropertiesNodeSvgLinearGradientComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgLinearGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesNodeSvgLinearGradientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgLinearGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

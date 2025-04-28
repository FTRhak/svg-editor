import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgRadialGradientComponent } from './properties-node-svg-radial-gradient.component';

describe('PropertiesNodeSvgRadialGradientComponent', () => {
  let component: PropertiesNodeSvgRadialGradientComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgRadialGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesNodeSvgRadialGradientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgRadialGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgCircleComponent } from './properties-node-svg-circle.component';

describe('PropertiesNodeSvgCircleComponent', () => {
  let component: PropertiesNodeSvgCircleComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesNodeSvgCircleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgEllipseComponent } from './properties-node-svg-ellipse.component';

describe('PropertiesNodeSvgEllipseComponent', () => {
  let component: PropertiesNodeSvgEllipseComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgEllipseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesNodeSvgEllipseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgEllipseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

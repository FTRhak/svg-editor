import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgRectComponent } from './properties-node-svg-rect.component';

describe('PropertiesNodeSvgRectComponent', () => {
  let component: PropertiesNodeSvgRectComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgRectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesNodeSvgRectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

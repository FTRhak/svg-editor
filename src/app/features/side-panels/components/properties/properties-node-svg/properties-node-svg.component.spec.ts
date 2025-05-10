import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgComponent } from './properties-node-svg.component';

describe('PropertiesNodeSvgComponent', () => {
  let component: PropertiesNodeSvgComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesNodeSvgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

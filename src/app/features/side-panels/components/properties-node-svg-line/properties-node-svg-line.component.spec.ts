import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgLineComponent } from './properties-node-svg-line.component';

describe('PropertiesNodeSvgLineComponent', () => {
  let component: PropertiesNodeSvgLineComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesNodeSvgLineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgPathComponent } from './properties-node-svg-path.component';

describe('PropertiesNodeSvgPathComponent', () => {
  let component: PropertiesNodeSvgPathComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesNodeSvgPathComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgGroupComponent } from './properties-node-svg-group.component';

describe('PropertiesNodeSvgGroupComponent', () => {
  let component: PropertiesNodeSvgGroupComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesNodeSvgGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

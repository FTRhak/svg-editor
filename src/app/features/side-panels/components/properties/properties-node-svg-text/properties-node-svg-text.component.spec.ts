import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesNodeSvgTextComponent } from './properties-node-svg-text.component';

describe('PropertiesNodeSvgTextComponent', () => {
  let component: PropertiesNodeSvgTextComponent;
  let fixture: ComponentFixture<PropertiesNodeSvgTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesNodeSvgTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesNodeSvgTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

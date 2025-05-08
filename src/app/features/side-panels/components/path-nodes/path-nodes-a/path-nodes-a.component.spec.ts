import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesAComponent } from './path-nodes-a.component';

describe('PathNodesAComponent', () => {
  let component: PathNodesAComponent;
  let fixture: ComponentFixture<PathNodesAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesAComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesZComponent } from './path-nodes-z.component';

describe('PathNodesZComponent', () => {
  let component: PathNodesZComponent;
  let fixture: ComponentFixture<PathNodesZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesZComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

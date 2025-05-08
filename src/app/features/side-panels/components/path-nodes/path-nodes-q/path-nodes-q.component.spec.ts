import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesQComponent } from './path-nodes-q.component';

describe('PathNodesQComponent', () => {
  let component: PathNodesQComponent;
  let fixture: ComponentFixture<PathNodesQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesQComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

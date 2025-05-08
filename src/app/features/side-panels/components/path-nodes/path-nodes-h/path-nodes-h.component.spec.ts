import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesHComponent } from './path-nodes-h.component';

describe('PathNodesHComponent', () => {
  let component: PathNodesHComponent;
  let fixture: ComponentFixture<PathNodesHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesHComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

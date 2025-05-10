import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesLComponent } from './path-nodes-l.component';

describe('PathNodesLComponent', () => {
  let component: PathNodesLComponent;
  let fixture: ComponentFixture<PathNodesLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesLComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

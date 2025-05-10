import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesVComponent } from './path-nodes-v.component';

describe('PathNodesVComponent', () => {
  let component: PathNodesVComponent;
  let fixture: ComponentFixture<PathNodesVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesVComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

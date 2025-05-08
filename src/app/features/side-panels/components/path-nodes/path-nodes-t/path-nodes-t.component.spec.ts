import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesTComponent } from './path-nodes-t.component';

describe('PathNodesTComponent', () => {
  let component: PathNodesTComponent;
  let fixture: ComponentFixture<PathNodesTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesTComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

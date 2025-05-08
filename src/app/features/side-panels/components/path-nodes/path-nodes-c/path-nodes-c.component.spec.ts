import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesCComponent } from './path-nodes-c.component';

describe('PathNodesCComponent', () => {
  let component: PathNodesCComponent;
  let fixture: ComponentFixture<PathNodesCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesCComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

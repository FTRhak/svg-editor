import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesSComponent } from './path-nodes-s.component';

describe('PathNodesSComponent', () => {
  let component: PathNodesSComponent;
  let fixture: ComponentFixture<PathNodesSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesSComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

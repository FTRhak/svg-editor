import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathNodesMComponent } from './path-nodes-m.component';

describe('PathNodesMComponent', () => {
  let component: PathNodesMComponent;
  let fixture: ComponentFixture<PathNodesMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathNodesMComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathNodesMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

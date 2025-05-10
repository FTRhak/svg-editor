import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupPropertiesStyleComponent } from './group-properties-style.component';

describe('GroupPropertiesStyleComponent', () => {
  let component: GroupPropertiesStyleComponent;
  let fixture: ComponentFixture<GroupPropertiesStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupPropertiesStyleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupPropertiesStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

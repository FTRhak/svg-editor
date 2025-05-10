import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupPropertiesStopComponent } from './group-properties-stop.component';

describe('GroupPropertiesStopComponent', () => {
  let component: GroupPropertiesStopComponent;
  let fixture: ComponentFixture<GroupPropertiesStopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupPropertiesStopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupPropertiesStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

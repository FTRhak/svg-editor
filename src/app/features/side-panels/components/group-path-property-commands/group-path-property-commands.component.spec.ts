import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupPathPropertyCommandsComponent } from './group-path-property-commands.component';

describe('GroupPathPropertyCommandsComponent', () => {
  let component: GroupPathPropertyCommandsComponent;
  let fixture: ComponentFixture<GroupPathPropertyCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupPathPropertyCommandsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupPathPropertyCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

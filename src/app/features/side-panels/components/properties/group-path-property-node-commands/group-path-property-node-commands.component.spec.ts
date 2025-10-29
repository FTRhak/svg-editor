import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupPathPropertyNodeCommandsComponent } from './group-path-property-node-commands.component';

describe('GroupPathPropertyNodeCommandsComponent', () => {
  let component: GroupPathPropertyNodeCommandsComponent;
  let fixture: ComponentFixture<GroupPathPropertyNodeCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupPathPropertyNodeCommandsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupPathPropertyNodeCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

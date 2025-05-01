import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverColorComponent } from './popover-color.component';

describe('PopoverColorComponent', () => {
  let component: PopoverColorComponent;
  let fixture: ComponentFixture<PopoverColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

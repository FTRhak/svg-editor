import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCodeDialogComponent } from './view-code-dialog.component';

describe('ViewCodeDialogComponent', () => {
  let component: ViewCodeDialogComponent;
  let fixture: ComponentFixture<ViewCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCodeDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

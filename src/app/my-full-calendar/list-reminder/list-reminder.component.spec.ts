import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReminderComponent } from './list-reminder.component';

describe('ListReminderComponent', () => {
  let component: ListReminderComponent;
  let fixture: ComponentFixture<ListReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

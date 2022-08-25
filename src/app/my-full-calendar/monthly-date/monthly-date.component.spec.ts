import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDateComponent } from './monthly-date.component';

describe('MonthlyDateComponent', () => {
  let component: MonthlyDateComponent;
  let fixture: ComponentFixture<MonthlyDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

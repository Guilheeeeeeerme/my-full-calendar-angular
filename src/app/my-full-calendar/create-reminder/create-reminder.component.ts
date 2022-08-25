import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { ReminderViewModel } from '../viewModels/reminderViewModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ReminderDateViewModel } from '../viewModels/reminderDateViewModel';
import { ReminderColorEnum } from '../viewModels/reminderColorEnum';

@Component({
  selector: 'app-create-reminder',
  templateUrl: './create-reminder.component.html',
  styleUrls: ['./create-reminder.component.css']
})
export class CreateReminderComponent implements OnInit, AfterViewInit {

  @Input("selectedDay")
  public selectedDay: ReminderDateViewModel | undefined;

  @Output("onCreateReminder")
  public onCreateReminder: EventEmitter<void> = new EventEmitter();

  // required for bootstrap
  @ViewChild('dp', { static: false })
  public dp: NgbDatepicker | undefined;

  public datepickerInitialValue: ReminderDateViewModel | undefined;
  public reminderForm: FormGroup = new FormGroup({});
  public colorOptions: { value: string }[] = [];

  constructor(private reminderService: ReminderService) { }

  get reminder() { return this.reminderForm.get('reminder'); }
  get city() { return this.reminderForm.get('city'); }
  get date() { return this.reminderForm.get('date'); }
  get time() { return this.reminderForm.get('time'); }
  get color() { return this.reminderForm.get('color'); }

  ngAfterViewInit() {
    this.initDatePicker();
  }

  ngOnInit(): void {

    this.colorOptions = [];

    for (let item in ReminderColorEnum) {
      if (isNaN(Number(item))) {
        this.colorOptions.push({
          value: (ReminderColorEnum as any)[item],
        });
      }
    }

    this.setFormValidation();
  }

  private setFormValidation(): void {
    this.reminderForm = new FormGroup({
      reminder: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
      date: new FormControl('', [
        Validators.required
      ]),
      time: new FormControl('', [
        Validators.required
      ]),
      color: new FormControl('', [
        Validators.required
      ]),
    });
  }

  private initDatePicker(): void {

    if (this.selectedDay) {
      this.datepickerInitialValue = new ReminderDateViewModel(this.selectedDay.year, this.selectedDay?.month + 1, this.selectedDay?.day)
    } else {
      const today = new Date();
      this.datepickerInitialValue = new ReminderDateViewModel(today.getFullYear(), today.getMonth() + 1, today.getDate());
    }

    if (this.dp) {
      this.dp.navigateTo(this.datepickerInitialValue);
    }
  }

  AddReminder(): void {
    this.onCreateReminder.emit();
    const newReminder: ReminderViewModel = this.reminderForm.value as ReminderViewModel;
    this.reminderService.addReminder(newReminder);
  }

}

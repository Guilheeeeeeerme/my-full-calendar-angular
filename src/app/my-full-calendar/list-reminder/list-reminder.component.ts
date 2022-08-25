import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OpenWeatherService } from '../open-weather.service';
import { ReminderService } from '../reminder.service';
import { ReminderDateViewModel } from '../viewModels/reminderDateViewModel';
import { ReminderViewModel } from '../viewModels/reminderViewModel';

@Component({
  selector: 'app-list-reminder',
  templateUrl: './list-reminder.component.html',
  styleUrls: ['./list-reminder.component.css']
})
export class ListReminderComponent implements OnChanges {

  @Input("selectedDay")
  public selectedDay: ReminderDateViewModel | undefined;

  @Output("onSelectReminder")
  public onSelectReminder: EventEmitter<ReminderViewModel> = new EventEmitter();

  @Output("onUpdateReminder")
  public onUpdateReminder: EventEmitter<void> = new EventEmitter();

  @Output("onCreateReminder")
  public onCreateReminder: EventEmitter<void> = new EventEmitter();

  @ViewChild('updateReminderModal', { static: false })
  public updateReminderModal: ElementRef | undefined;

  @ViewChild('createReminderModal', { static: false })
  public createReminderModal: ElementRef | undefined;

  public reminders: ReminderViewModel[] = [];
  public selectedReminder: ReminderViewModel | undefined;
  public dateLabel: Date = new Date();

  constructor(private modalService: NgbModal,
    private reminderService: ReminderService,
    private openWeatherService: OpenWeatherService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateRemindersList();
  }

  public onClickCreateReminder() {

    this.modalService.open(this.createReminderModal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed with: ${reason}`);
      });

  }

  public onSelectReminderOnList(reminder: ReminderViewModel) {
    this.selectedReminder = reminder;
    this.onSelectReminder.emit(reminder);

    this.modalService.open(this.updateReminderModal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed with: ${reason}`);
      });

  }

  public onCreateReminderModalDismised() {
    this.modalService.dismissAll();
  }

  public onUpdateReminderModalDismised() {
    this.modalService.dismissAll();
  }

  public onReminderCreated() {
    this.modalService.dismissAll();
    this.onCreateReminder.emit();
  }

  public onReminderUpdated() {
    this.modalService.dismissAll();
    this.onUpdateReminder.emit();
  }

  public async onClickClearAll() {
    if(this.reminders) {

      for (const reminder of this.reminders) {
        await this.reminderService.deleteReminder(reminder);
      }
     
      this.onUpdateReminder.emit(); 
    }
  }

  private async updateRemindersList() {

    if (this.selectedDay)
      this.dateLabel = new Date(this.selectedDay?.year, this.selectedDay?.month, 1);

    let reminders: ReminderViewModel[] = [];
    try {
      if (this.selectedDay)
        reminders = await this.reminderService.getRemindersForDate(this.selectedDay);
    } catch {
      reminders = [];
    }

    this.reminders = reminders;

    for (const reminder of this.reminders) {
      reminder.weatherInfo = null;
      try {
        reminder.weatherInfo = await this.openWeatherService.getWeatherForecast(reminder.city, reminder.date);
      } catch {
        reminder.weatherInfo = null;
      }
    }
  }

}

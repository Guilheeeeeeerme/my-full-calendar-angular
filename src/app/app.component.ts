import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'my-full-calendar-angular';

  public currentMonth: number = 0;
  public currentFullYear: number = 0;
  private targetDate: Date;

  constructor() {
    this.targetDate = new Date();
    this.setCalendarDate();
  }

  private setCalendarDate(){
    this.currentMonth = this.targetDate.getMonth();
    this.currentFullYear = this.targetDate.getFullYear();
  }

  public goNextMonth() {
    this.targetDate.setMonth(this.targetDate.getMonth() + 1);
    this.setCalendarDate();
  }

  public goPreviousMonth() {
    this.targetDate.setMonth(this.targetDate.getMonth() - 1);
    this.setCalendarDate();
  }

}



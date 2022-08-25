import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyCalendarComponent } from './monthly-calendar/monthly-calendar.component';
import { MonthlyDateComponent } from './monthly-date/monthly-date.component';
import { CreateReminderComponent } from './create-reminder/create-reminder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateReminderComponent } from './update-reminder/update-reminder.component';
import { ListReminderComponent } from './list-reminder/list-reminder.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReminderDescriptionPipe } from './reminder-description.pipe';
import { HttpClientModule } from '@angular/common/http';
import { WeatherPipe } from './weather.pipe';
import {NgxLocalStorageModule} from 'ngx-localstorage';



@NgModule({
  declarations: [
    MonthlyCalendarComponent,
    MonthlyDateComponent,
    CreateReminderComponent,
    UpdateReminderComponent,
    ListReminderComponent,
    ReminderDescriptionPipe,
    WeatherPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
		HttpClientModule,
    NgbModule,
    NgxLocalStorageModule.forRoot()
  ],
  exports: [
    MonthlyCalendarComponent,
    MonthlyDateComponent,
    CreateReminderComponent,
    UpdateReminderComponent,
    ReminderDescriptionPipe,
    WeatherPipe
  ]
})
export class MyFullCalendarModule { }

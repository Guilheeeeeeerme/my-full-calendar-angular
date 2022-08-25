import { Injectable } from '@angular/core';
import { ReminderViewModel } from './viewModels/reminderViewModel';
import { v4 as uuidv4 } from 'uuid';
import { ReminderDateViewModel } from './viewModels/reminderDateViewModel';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private _storageService: LocalStorageService) { }

  private get key() {
    return "my-reminders"
  }

  private sortReminders(dateA: ReminderViewModel, dateB: ReminderViewModel) {

    if (+dateA.date.year > +dateB.date.year) {
      return 1;
    }

    if (+dateA.date.month > +dateB.date.month) {
      return 1;
    }

    if (+dateA.date.day > +dateB.date.day) {
      return 1;
    }

    if (+dateA.time.hour > +dateB.time.hour) {
      return 1;
    }

    if (+dateA.time.minute > +dateB.time.minute) {
      return 1;
    }

    return -1;

  }

  deleteReminder(reminderVm: ReminderViewModel): Promise<void> {

    return new Promise((resolve, reject) => {
      try {

        let reminders: ReminderViewModel[] = [];

        try  {
          reminders = this._storageService.get(this.key);
        } catch {
          reminders = [];
        }

        if(!reminders || !reminders.length)
          reminders = [];

        reminders = reminders.filter((x) => {
          return x.id != reminderVm.id;
        })

        this._storageService.set(this.key, reminders);

        resolve()
      } catch (e) {
        reject(e)
      }
    })

  }

  updateReminder(reminderVm: ReminderViewModel): Promise<string> {

    if (!reminderVm || !reminderVm.reminder)
      throw Error("Unable to save reminder");

    if (reminderVm.reminder.length > 30)
      throw Error("Reminder name must have at most 30 characters");

    return new Promise((resolve, reject) => {
      try {

        let reminders: ReminderViewModel[] = [];

        try {
          reminders = this._storageService.get(this.key);
        } catch {
          reminders = [];
        }

        if(!reminders || !reminders.length)
          reminders = [];

        reminders = reminders.filter((x) => {
          return x.id != reminderVm.id;
        })

        reminders.push(reminderVm);
        reminders = reminders.sort(this.sortReminders);
        this._storageService.set(this.key, reminders);

        resolve(reminderVm.id)
      } catch (e) {
        reject(e)
      }
    })
  }

  addReminder(reminderVm: ReminderViewModel): Promise<string> {

    if (!reminderVm || !reminderVm.reminder)
      throw Error("Unable to save reminder");

    if (reminderVm.reminder.length > 30)
      throw Error("Reminder name must have at most 30 characters");

    return new Promise(async (resolve, reject) => {
      try {

        let reminders: ReminderViewModel[] = [];

        try {
          reminders = this._storageService.get(this.key);
        } catch {
          reminders = [];
        }

        if(!reminders || !reminders.length)
          reminders = [];

        reminderVm.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        reminders.push(reminderVm);
        reminders = reminders.sort(this.sortReminders);
        this._storageService.set(this.key, reminders);

        resolve(reminderVm.id)
      } catch (e) {
        reject(e)
      }
    })
  }

  getRemindersForDate(reminderDateVm: ReminderDateViewModel): Promise<ReminderViewModel[]> {
    return new Promise((resolve, reject) => {

      let reminders: ReminderViewModel[] = [];

      try {
        reminders = this._storageService.get(this.key);
      } catch {
        reminders = [];
      }

      if(!reminders || !reminders.length)
        reminders = [];

      if (reminders && reminders.length > 0) {
        reminders = reminders.filter(date => {
          return +date.date.year == +reminderDateVm.year
            && +(date.date.month - 1) == +reminderDateVm.month
            && +date.date.day == +reminderDateVm.day;
        })
      }

      // reminders = reminders.sort(this.sortReminders);
      resolve(reminders);

    });
  }

}

import { ReminderColorEnum } from "./reminderColorEnum";
import { ReminderDateViewModel } from "./reminderDateViewModel";
import { ReminderTimeViewModel } from "./reminderTimeViewModel";


export class ReminderViewModel {

    constructor(
        public id: string,
        public reminder: string,
        public city: string,
        public date: ReminderDateViewModel,
        public time: ReminderTimeViewModel,
        public weatherInfo: any,
        public color: ReminderColorEnum,) {
    }
}
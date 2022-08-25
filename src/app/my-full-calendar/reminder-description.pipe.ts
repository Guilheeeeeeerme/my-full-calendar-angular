import { Pipe, PipeTransform } from '@angular/core';
import { ReminderViewModel } from './viewModels/reminderViewModel';

@Pipe({
  name: 'reminderDescription'
})
export class ReminderDescriptionPipe implements PipeTransform {

  transform(value: ReminderViewModel, ...args: unknown[]): any {
    const mode = args[0];
    if(mode == 'datetime') {
      return new Date(value.date.year, value.date.month, value.date.day, value.time.hour, value.time.minute);
    } else if(mode == 'date') {
      return new Date(value.date.year, value.date.month, value.date.day);
    }
    return `${value.time.hour.toFixed(0).padStart(2, '0')}:${value.time.minute.toFixed(0).padStart(2, '0')} - ${value.reminder}`;
  }

}

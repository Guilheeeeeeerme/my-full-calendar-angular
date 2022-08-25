import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'ngx-localstorage';

import { ReminderService as ReminderService } from './reminder.service';
import { ReminderColorEnum } from './viewModels/reminderColorEnum';
import { ReminderViewModel } from './viewModels/reminderViewModel';

function MockStorage() {

  let store: any = {};

  return {
    get: (key: string): any => {
      return key in store ? store[key] : null;
    },

    set: (key: string, value: any) => {
      store[key] = value;
    }
  }
}


describe('ReminderService', () => {
  let service: ReminderService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReminderService,
        { provide: LocalStorageService, useValue: MockStorage() }
      ]
    });
    service = TestBed.inject(ReminderService);
    localStorageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save reminder', async () => {
    const reminderService = new ReminderService(localStorageServiceSpy);

    const insertSample = new ReminderViewModel('', 'Teste Reminder', 'Itajubá',
      { year: 2021, month: 6, day: 1 },
      { hour: 12, minute: 12, second: 12 },
      null, ReminderColorEnum.color1)

    const insertResult = await reminderService.addReminder(insertSample)
    expect(insertResult).not.toBeNull(insertResult);
  });

  it('should note save reminder due to length', () => {
    const reminderService = new ReminderService(localStorageServiceSpy);

    const insertSample = new ReminderViewModel('', 'Teste Reminder Teste Reminder Teste Reminder Teste Reminder', 'Itajubá',
      { year: 2021, month: 6, day: 1 },
      { hour: 12, minute: 12, second: 12 },
      null, ReminderColorEnum.color1)

    expect(function () { reminderService.addReminder(insertSample) })
      .toThrow(new Error("Reminder name must have at most 30 characters"))
  });

  // it('should note update reminder due to length', async () => {
  //   const reminderService = new ReminderService(localStorageServiceSpy);

  //   const insertSample = new ReminderViewModel('', 'Teste Reminder', 'Itajubá',
  //     { year: 2021, month: 6, day: 1 },
  //     { hour: 12, minute: 12, second: 12 },
  //     null, ReminderColorEnum.color1)

  //   const insertResult = await reminderService.addReminder(insertSample)
  //   expect(insertResult).not.toBeNull(insertResult);

  //   const existingItens: ReminderViewModel[] = await reminderService.getRemindersForDate({ year: 2021, month: 6, day: 1 });
  //   expect(existingItens.length).toBeGreaterThan(0);

  //   const updateSample = existingItens[0];
  //   updateSample.reminder = 'Teste Reminder Teste Reminder Teste Reminder Teste Reminder';
  //   expect(function () { reminderService.updateReminder(updateSample) })
  //     .toThrow(new Error("Reminder name must have at most 30 characters"))
  // });

});

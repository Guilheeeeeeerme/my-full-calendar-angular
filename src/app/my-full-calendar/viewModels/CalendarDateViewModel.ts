export class CalendarDateViewModel {

  public withinTheViewMonth: boolean = false;
  public day: number = 0;
  public weekday: number = 0;
  public month: number = 0;
  public year: number = 0;

  public constructor(param: Date, withinTheViewMonth: boolean) {
    this.withinTheViewMonth = withinTheViewMonth;
    this.day = param.getDate();
    this.weekday = param.getDay();
    this.month = param.getMonth();
    this.year = param.getFullYear();
  }
}
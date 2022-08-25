import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OPENWEATHER_API, OPENWEATHER_TOKEN } from 'src/environments/urls';
import { ReminderDateViewModel } from './viewModels/reminderDateViewModel';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(private http: HttpClient) { }

  private filterMostRecent(forecastRes: any, date: ReminderDateViewModel) {

    let forecast: any[] = forecastRes.list.filter((x: any) => {
      let dt = new Date(x.dt * 1000);
      return dt.getFullYear() == date.year
        && dt.getMonth() + 1 == date.month
        && dt.getDate() == date.day;
    })

    if (forecast && forecast.length)
      return forecast[forecast.length - 1];

    return null;

  }

  public getWeatherForecast(city_name: string, date: ReminderDateViewModel) {

    return new Promise((resolve, reject) => {

      const request = this.http.get(
        `${OPENWEATHER_API}/forecast`, {
        params: {
          q: city_name,
          units: 'metric',
          appid: OPENWEATHER_TOKEN
        }
      });

      request.subscribe((res) => {
        resolve(this.filterMostRecent(res, date))
      }, reject);

    });

  }

  // /forecast/daily?q={city name}&cnt={cnt}&appid={API key}
}

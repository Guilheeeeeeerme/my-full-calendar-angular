import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weather'
})
export class WeatherPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let weather = '';
    weather += `${value.main ? value.main?.temp + ' °C.' : ''}`;
    weather += ` ${value.weather[0]?.main}, ${value.weather[0]?.description}.`;
    if(value.main && value.main.temp_min && value.main.temp_max) {
      weather += ` Min ${value.main.temp_min} °C, Max ${value.main.temp_max} °C`;
    }
    return weather;
  }

}

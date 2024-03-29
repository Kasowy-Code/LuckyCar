import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Time} from "@angular/common";
import {LotteryEndDateDto} from "../dto/lottery-end-date-dto";

@Injectable({
  providedIn: 'root'
})
export class ChangeLotterySettingsHttpService {
  private drawSettingsUrl = `${environment.link}/api/settings`;
  selectedDate = <Date>{};
  selectedHour = <Time>{};

  constructor(private http: HttpClient) {
  }

  changeRegularLotteryDate(lotteryEndDateDto: LotteryEndDateDto) {

    console.log('week ' + lotteryEndDateDto.registrationEndWeek);
    console.log('day ' + lotteryEndDateDto.registrationEndDay);
    console.log('hour ' + lotteryEndDateDto.registrationEndHour);

    return this.http.patch(`${this.drawSettingsUrl}`, lotteryEndDateDto);
  }

  changeTemporaryLotteryDate(selectedDate: Date, selectedHour: Time) {
    this.selectedDate = selectedDate;
    this.selectedHour = selectedHour;

    this.setSelectedDateHoursAndMinutes();

    let body = {
      "temporaryDrawDate": this.selectedDate.toISOString()
    };

    return this.http.patch(`${this.drawSettingsUrl}`, body);
  }

  setSelectedDateHoursAndMinutes() {

    var hoursAndMinutes: number[] = [];

    var timeArrayString = this.selectedHour.toString().split(":", 2);
    for (let item of timeArrayString) {
      let no: number = Number(item);
      hoursAndMinutes.push(no)
    }

    this.selectedDate.setHours(hoursAndMinutes[0] + 2);
    this.selectedDate.setMinutes(hoursAndMinutes[1]);
  }
}

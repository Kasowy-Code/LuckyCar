import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChangeLotterySettingsHttpService {
  private drawSettingsUrl = `${environment.link}/api/settings`;

  constructor(private http: HttpClient) {
  }

  changeTemporaryLotteryDate(date: any) {
    console.log(date);

    let body = `"temporaryDate": "${date}"`;

    console.log("dupadupa " + body)

    //"temporaryDate": "2022-08-07T12:00:00"
    return this.http.patch(`${this.drawSettingsUrl}`, {body});
  }
}

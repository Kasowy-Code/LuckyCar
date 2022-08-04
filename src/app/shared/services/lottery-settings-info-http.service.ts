import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LotterySettings} from "../dto/lottery-settings";


@Injectable({
  providedIn: 'root'
})
export class LotterySettingsInfoHttpService {
  private drawSettingsUrl = `${environment.link}/api/settings`;

  constructor(private http: HttpClient) {
  }

  getLotterySettings() {
    return this.http.get<LotterySettings>(`${this.drawSettingsUrl}`);
  }

  getLotteryMonth() {
    return this.http.get<string>(`${this.drawSettingsUrl}/month`);
  }
}

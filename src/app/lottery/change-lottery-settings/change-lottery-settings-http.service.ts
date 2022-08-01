import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChangeLotterySettingsHttpService {
  private drawSettingsUrl = `${environment.link}/api/settings`;

  constructor(private http: HttpClient) {
  }

  activateLottery() {
    return this.http.patch(`${this.drawSettingsUrl}/activate`, {});
  }

  deactivateLottery() {
    return this.http.patch(`${this.drawSettingsUrl}/deactivate`, {});
  }
}

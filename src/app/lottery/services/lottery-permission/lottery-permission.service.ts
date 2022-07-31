import {Injectable} from '@angular/core';
import {of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DrawSettings} from "../../../shared/dto/draw-settings";

@Injectable({
  providedIn: 'root'
})
export class LotteryPermissionService {
  private drawSettingsUrl = `${environment.link}/api/settings`;

  constructor(private http: HttpClient) {
  }

  getLotteryIsOpen() {
    return this.http.get<DrawSettings>(`${this.drawSettingsUrl}/1`);
  }
}

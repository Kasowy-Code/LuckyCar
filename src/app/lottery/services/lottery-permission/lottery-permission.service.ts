import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserDraw} from "../../../global-dto/user-draw";
import {DrawSettings} from "../../../global-dto/draw-settings";

@Injectable({
  providedIn: 'root'
})
export class LotteryPermissionService {
  private userDrawUrl = `${environment.link}api/userdraw`;
  private drawSettingsUrl = `${environment.link}api/settings`;
  private currentUserId = '1';

  constructor(private http: HttpClient) {
  }


  getUserIsSignedUpToLottery(): Observable<UserDraw> {
    return this.http.get<UserDraw>(`${this.userDrawUrl}/${this.currentUserId}`);
  }

  getLotteryIsOpen() {
    return this.http.get<DrawSettings>(`${this.drawSettingsUrl}/1`);
  }
}

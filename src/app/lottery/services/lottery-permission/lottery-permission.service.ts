import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserDraw} from "../../../global-dto/user-draw";
import {User} from "../../../global-dto/user";

@Injectable({
  providedIn: 'root'
})
export class LotteryPermissionService {
  private userDrawUrl = `${environment.link}/api/userdraw`;
  private drawSettingsUrl = `${environment.link}/api/settings`;
  user = <User>{"id": 1}
  userDraw = {"id": 1, "user": this.user, "registeredForDraw": false, "consecutiveDraws": 0, "declaredParking": 0};
  drawSettings = {"registrationEndDay": 20, "active": true};

  constructor(private http: HttpClient) {
  }


  getUserIsSignedUpToLottery(): Observable<UserDraw> {
    //return this.http.get<UserDraw>(`${this.userDrawUrl}`);
    return of(this.userDraw);
  }

  getLotteryIsOpen() {
    //return this.http.get<DrawSettings>(`${this.drawSettingsUrl}/1`);
    return of(this.drawSettings);
  }
}

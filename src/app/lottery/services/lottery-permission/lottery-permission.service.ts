import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserDraw} from "../../../shared/dto/user-draw";

@Injectable({
  providedIn: 'root'
})
export class LotteryPermissionService {
  private userIsSignedUpToLotteryUrl = `${environment.link}/api/userdraw/isregistered`;
  private drawSettingsUrl = `${environment.link}/api/settings`;
  drawSettings = {"registrationEndDay": 20, "active": true};

  constructor(private http: HttpClient) {
  }

  getUserIsSignedUpToLottery(): Observable<UserDraw> {
    return this.http.get<UserDraw>(this.userIsSignedUpToLotteryUrl);
  }

  getLotteryIsOpen() {
    return of(this.drawSettings);
  }
}

import {Injectable} from '@angular/core';
import {of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LotteryPermissionService {
  private userIsSignedUpToLotteryUrl = `${environment.link}/api/userdraw/userlotteryinfo`;
  private drawSettingsUrl = `${environment.link}/api/settings`;
  drawSettings = {"registrationEndDay": 20, "active": false};

  constructor(private http: HttpClient) {
  }

  getLotteryIsOpen() {
    return of(this.drawSettings);
  }
}

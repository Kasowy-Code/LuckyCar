import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ParkingLot} from "../../../shared/dto/parking-lot";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserActionHttpService {
  private userDrawSignUpToLotteryUrl = `${environment.link}/api/userdraw/registerfordraw`;
  private userDrawResignFromLotteryUrl = `${environment.link}/api/userdraw/resignfromdraw`;

  constructor(private http: HttpClient) {
  }

  registerUserForDraw(chosenParkingLot: ParkingLot) {
    return this.http.post(this.userDrawSignUpToLotteryUrl, chosenParkingLot.id);
  }

  cancelSigningUpToLottery() {
    return this.http.post(this.userDrawResignFromLotteryUrl, {});
  }
}

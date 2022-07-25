import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDraw} from "../../../global-dto/user-draw";
import {ParkingLot} from "../../../global-dto/parking-lot";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserActionService {
  private userDrawUrl = `${environment.link}api/userdraw`;

  constructor(private http: HttpClient) {
  }

  registerUserForDraw(user: UserDraw) {
    user.registeredForDraw = true;
    //this.http.patch(`${this.userDrawUrl}/${environment.currentUserId}`, this.user);
  }

  setUserChosenParking(chosenParkingLot: ParkingLot, user: UserDraw) {
    user.declaredParking = chosenParkingLot.id;
  }

  cancelSigningUpToLottery(user: UserDraw) {
    user.registeredForDraw = false;
    user.declaredParking = 0;
  }
}

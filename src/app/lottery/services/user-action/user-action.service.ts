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
  user = <UserDraw>{};

  constructor(private http: HttpClient) {
  }

  registerUserForDraw() {
    this.user.registeredForDraw = true;
    //this.http.patch(`${this.userDrawUrl}/${environment.currentUserId}`, user);
  }

  setUserChosenParking(chosenParkingLot: ParkingLot, user: UserDraw) {
    this.user.declaredParking = chosenParkingLot.id;
  }

  cancelSigningUpToLottery() {
    this.user.registeredForDraw = false;
    this.user.declaredParking = 0;
  }
}

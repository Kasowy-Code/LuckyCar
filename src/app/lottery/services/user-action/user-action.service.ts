import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDraw} from "../../../global-dto/user-draw";
import {ParkingLot} from "../../../global-dto/parking-lot";

@Injectable({
  providedIn: 'root'
})
export class UserActionService {

  constructor(private http: HttpClient) {
  }

  patchUserIsRegisterForDraw(user: UserDraw){
    user.registeredForDraw = true;
  }

  patchUserDeclaredParking(chosenParkingLot: ParkingLot){

  }
}

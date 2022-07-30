import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserDraw} from "../../dto/user-draw";
import {ParkingLot} from "../../dto/parking-lot";

@Injectable({
  providedIn: 'root'
})
export class UserDrawInfoHttpService {
  private getCurrentUserDrawInfoUrl = `${environment.link}/api/userdraw/userlotteryinfo`;

  constructor(private http: HttpClient) {
  }

  getCurrentUserDrawInfo() {
    return this.http.get<UserDraw>(this.getCurrentUserDrawInfoUrl);
  }

  getCurrentUserChosenParkingLot(parkingLotId: any) {
    return this.http.get<ParkingLot>(`${environment.link}/api/parking-lots/${parkingLotId}`);
  }
}

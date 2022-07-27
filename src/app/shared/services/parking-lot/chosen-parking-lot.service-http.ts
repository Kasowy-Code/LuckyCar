import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChosenParkingLotServiceHttp {
  private userGetChosenParkingLotUrl = `${environment.link}/api/userdraw/`;

  constructor(private http: HttpClient) {
  }

  getCurrentUserChosenParkingLot() {

  }
}

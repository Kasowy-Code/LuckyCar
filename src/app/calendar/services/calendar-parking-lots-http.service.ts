import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ParkingLot} from "../../shared/dto/parking-lot";
import {ParkingPlaceDay} from "../../shared/dto/parking-place-day";

@Injectable({
  providedIn: 'root'
})
export class CalendarParkingLotsHttpService {

  constructor(private http: HttpClient) {
  }

  getParkingLots() {
    return this.http.get<ParkingLot[]>(`${environment.link}/api/parking-lots`);
  }

  getMyParkingPlaces() {
    return this.http.get(`${environment.link}/api/parking-places/me`);
  }

  getAllParkingPlaces() {
    return this.http.get<ParkingPlaceDay[]>(`${environment.link}/api/parking-places`);
  }

  freePlace(days:any) {
    console.log(days);
    return this.http.patch(`${environment.link}/api/parking-places/free`,
      days,
      {responseType: 'text' as 'json'});
  }

  takePlace(day:any, parkingId:any){
    const request = {
      "day": day,
      "parkingLotId": parkingId
    }
    console.log(parkingId);
    console.log(request);

    return this.http.patch(`${environment.link}/api/parking-places/own`,
      request,
      {responseType: 'text' as 'json'});
  }

  getDrawEndDate() {
    return this.http.get(`${environment.link}/api/settings`);
  }
}

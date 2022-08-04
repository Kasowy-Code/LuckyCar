import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CalendarParkingLotsHttpService {

  constructor(private http: HttpClient) {
  }

  getParkingLots() {
    return this.http.get(`${environment.link}/api/parking-lots`);
  }

  getMyParkingPlaces() {
    return this.http.get(`${environment.link}/api/parking-places/me`);
  }

  getAllParkingPlaces() {
    return this.http.get(`${environment.link}/api/parking-places`);
  }
}

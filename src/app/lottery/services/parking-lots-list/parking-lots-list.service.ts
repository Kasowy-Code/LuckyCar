import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ParkingLot} from "../../../global-dto/parking-lot";


@Injectable({
  providedIn: 'root'
})
export class ParkingLotsListService {
  private ParkingLotsUrl = `${environment.link}/api/parking-lots`;

  constructor(private http: HttpClient) {
  }

  getParkingLots(): Observable<ParkingLot[]> {
    return this.http.get<ParkingLot[]>(this.ParkingLotsUrl);
  }
}

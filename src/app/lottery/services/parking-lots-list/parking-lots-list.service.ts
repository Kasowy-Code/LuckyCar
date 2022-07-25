import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ParkingLot} from "../../../global-dto/parking-lot";


@Injectable({
  providedIn: 'root'
})
export class ParkingLotsListService {
  private ParkingLotsUrl = `${environment.link}api/parking-lots`;
  // parkingLots: {id: number,
  //   name: string,
  //   parkingPlaceCount: number,
  //   available: boolean,}[] = [
  //   {"id": 1, "name": "dupa", "parkingPlaceCount": 4, "available": true},
  //   {"id": 2, "name": "dupa", "parkingPlaceCount": 4, "available": true},
  //   {"id": 3, "name": "dupa", "parkingPlaceCount": 4, "available": true}
  // ];

  parkingLots = [
    {"id": 1, "name": "dupa", "parkingPlaceCount": 4, "available": true},
    {"id": 2, "name": "dupa", "parkingPlaceCount": 4, "available": true},
    {"id": 3, "name": "dupa", "parkingPlaceCount": 4, "available": true}
  ];
  
  constructor(private http: HttpClient) {
  }

  getParkingLots(): Observable<ParkingLot[]> {
    //return this.http.get<ParkingLot[]>(this.ParkingLotsUrl);
    return of(this.parkingLots);
  }
}

import {EventEmitter, Injectable, Output} from '@angular/core';
import {ParkingLot} from "../dto/parking-lot";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ParkingLotsListService {
  //private parkingLotsUrl = `${environment.link}/api/parking-lots`;
  private parkingLotsUrl =  'http://localhost:8080/api/parking-lots';
  request: any = {};

  public parkingLot: [{ parkingPlaceCount: number; name: string; available: boolean; id: number }, { parkingPlaceCount: number; name: string; available: boolean; id: number }, { parkingPlaceCount: number; name: string; available: boolean; id: number }] = [
     {id: 1, name: 'Parking 1', parkingPlaceCount: 5, available: true},
     {id: 2, name: 'Parking 2', parkingPlaceCount: 5, available: true},
     {id: 3, name: 'Parking 3', parkingPlaceCount: 5, available: true},
  ];

  constructor(private http: HttpClient) { }

  // getParkingLot(): Observable<ParkingLot[]>{
  //   return this.http.get<ParkingLot[]>(`${environment.link}/api/parking-lots` , {responseType: 'text' as 'json'});
  // }

  getParkingLot(): Observable<ParkingLot[]>{
    return this.http.get<ParkingLot[]>(this.parkingLotsUrl , {responseType: 'text' as 'json'});
  }

  // addParkingLot(): Observable<ParkingLot> {
  //   return this.http.post<ParkingLot>(`${environment.link}/api/parking-lots`, {responseType: 'text' as 'json'});
  // }

  addParkingLot(name: string): Observable<ParkingLot> {
    this.request= {
      "name": name
    };
    return this.http.post<ParkingLot>(`${environment.link}/api/parking-lots`, this.request, {responseType: 'text' as 'json'});
  }
}



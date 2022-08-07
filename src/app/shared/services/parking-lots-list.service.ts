import {Injectable} from '@angular/core';
import {ParkingLot} from "../dto/parking-lot";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ParkingLotsListService {

  constructor(private http: HttpClient) { }


  getParkingLotsList(): Observable<ParkingLot[]>{
    return this.http.get<ParkingLot[]>(`${environment.link}/api/parking-lots`);
  }

  addParkingLot(parkingLot: ParkingLot): Observable<ParkingLot> {
    return this.http.post<ParkingLot>(`${environment.link}/api/parking-lots`, parkingLot);
  }

  deleteParkingLot(id: any){
    return this.http.delete<any>(`${environment.link}/api/parking-lots/${id}`);
  }

  changeStatus(id: any, parkingLot: ParkingLot): Observable<ParkingLot>{
    return this.http.patch<ParkingLot>(`${environment.link}/api/parking-lots/${id}`, parkingLot);
  }

  addParkingPlaceToParkingLot(id: any, parkingLot: ParkingLot): Observable<ParkingLot>{
    return this.http.patch<ParkingLot>(`${environment.link}/api/parking-lots/add/${id}`, parkingLot);
  }

  subtractParkingPlaceToParkingLot(id: any, parkingLot: ParkingLot): Observable<ParkingLot>{
    return this.http.patch<ParkingLot>(`${environment.link}/api/parking-lots/subtract/${id}`, parkingLot);
  }


}



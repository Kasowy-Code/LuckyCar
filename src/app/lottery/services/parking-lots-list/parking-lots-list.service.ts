import {Injectable} from '@angular/core';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParkingLotsListService {

  constructor() {
  }

  getParkingLots() {
    return of(['parking 1', 'parking 2', 'parking 3', 'parking 4'])
  }
}

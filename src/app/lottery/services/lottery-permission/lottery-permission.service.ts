import {Injectable} from '@angular/core';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LotteryPermissionService {

  constructor() {
  }

  getUserIsSignedUpToLottery() {
    return of(false);
  }

  getLotteryIsOpen() {
    return of(true);
  }

}

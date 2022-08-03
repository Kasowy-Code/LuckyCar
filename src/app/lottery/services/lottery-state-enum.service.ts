import {Injectable} from '@angular/core';
import {LotteryStateEnum} from "../lottery-state-enum";

@Injectable({
  providedIn: 'root'
})
export class LotteryStateEnumService {
  lotteryState = LotteryStateEnum.NOT_LOADED;
}

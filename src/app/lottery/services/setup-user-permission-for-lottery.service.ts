import { Injectable } from '@angular/core';
import {forkJoin} from "rxjs";
import {UserDrawInfoHttpService} from "../../shared/services/user-draw-info-http.service";
import {LotterySettingsInfoHttpService} from "../../shared/services/lottery-settings-info-http.service";
import {UserDraw} from "../../shared/dto/user-draw";
import {LotterySettings} from "../../shared/dto/lottery-settings";
import {LotteryStateEnum} from "../lottery-state-enum";

@Injectable({
  providedIn: 'root'
})
export class SetupUserPermissionForLotteryService {
  lotteryState = LotteryStateEnum.NOTLOADED;

  constructor() { }


}

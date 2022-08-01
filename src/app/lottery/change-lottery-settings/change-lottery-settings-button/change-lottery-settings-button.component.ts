import {Component, Input, OnInit} from '@angular/core';
import {LotterySettings} from "../../../shared/dto/lottery-settings";
import {LotterySettingsInfoHttpService} from "../../../shared/services/lottery-settings-info-http.service";
import {ChangeLotterySettingsHttpService} from "../change-lottery-settings-http.service";
import {SetupUserPermissionForLotteryService} from "../../services/setup-user-permission-for-lottery.service";
import {LotteryStateEnum} from "../../lottery-state-enum";

@Component({
  selector: 'app-change-lottery-settings-button',
  templateUrl: './change-lottery-settings-button.component.html',
  styleUrls: ['./change-lottery-settings-button.component.scss']
})
export class ChangeLotterySettingsButtonComponent implements OnInit {
  lotterySettings = <LotterySettings>{};

  constructor(private lotterySettingsInfoHttpService: LotterySettingsInfoHttpService,
              private changeLotterySettingsHttpService: ChangeLotterySettingsHttpService,
              public setupUserPermissionForLotteryService: SetupUserPermissionForLotteryService) {
  }

  ngOnInit(): void {
  }

  setupLotteryState() {
    this.lotterySettingsInfoHttpService.getLotterySettings().subscribe(lotteryIsOpen => {
      this.lotterySettings = lotteryIsOpen;
    });
  }

  changeLotteryState() {
    if (this.lotterySettings.isActive) {
      this.changeLotterySettingsHttpService.deactivateLottery().subscribe(() => {
        this.setupLotteryState();

        this.setupUserPermissionForLotteryService.lotteryState = LotteryStateEnum.INACTIVE;
      });
    } else if (!this.lotterySettings.isActive) {
      this.changeLotterySettingsHttpService.activateLottery().subscribe(() => {
        this.setupLotteryState();

        this.setupUserPermissionForLotteryService.lotteryState = LotteryStateEnum.ACTIVE;
      });
    }
  }
}

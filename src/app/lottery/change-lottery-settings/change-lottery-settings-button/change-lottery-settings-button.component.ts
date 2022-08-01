import {Component, OnInit} from '@angular/core';
import {DrawSettings} from "../../../shared/dto/draw-settings";
import {LotterySettingsInfoHttpService} from "../../../shared/services/lottery-settings-info-http.service";
import {ChangeLotterySettingsHttpService} from "../change-lottery-settings-http.service";

@Component({
  selector: 'app-change-lottery-settings-button',
  templateUrl: './change-lottery-settings-button.component.html',
  styleUrls: ['./change-lottery-settings-button.component.scss']
})
export class ChangeLotterySettingsButtonComponent implements OnInit {
  lotterySettings = <DrawSettings>{};

  constructor(private lotterySettingsInfoHttpService: LotterySettingsInfoHttpService,
              private changeLotterySettingsHttpService: ChangeLotterySettingsHttpService) {
  }

  ngOnInit(): void {
  }

  setupLotteryIsState() {
    this.lotterySettingsInfoHttpService.getLotterySettings().subscribe(lotteryIsOpen => {
      this.lotterySettings = lotteryIsOpen;
    });
  }

  changeLotteryState() {
    if (this.lotterySettings.isActive) {
      this.changeLotterySettingsHttpService.deactivateLottery().subscribe(() => {
        this.setupLotteryIsState()
      });
    } else if (!this.lotterySettings.isActive) {
      this.changeLotterySettingsHttpService.activateLottery().subscribe(() => {
        this.setupLotteryIsState()
      });
    }
  }
}

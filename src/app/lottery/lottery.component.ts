import {Component, OnInit} from '@angular/core';
import {LotterySettingsInfoHttpService} from "../shared/services/lottery-settings-info-http.service";
import {RoleService} from "../role.service";
import {LotterySettings} from "../shared/dto/lottery-settings";

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
})
export class LotteryComponent implements OnInit {
  lotteryMonth = '';
  lotterySettings = <LotterySettings>{};

  constructor(private lotterySettingsInfoHttpService: LotterySettingsInfoHttpService,
              public roleService: RoleService) {
  }

  ngOnInit(): void {
    this.lotterySettingsInfoHttpService.getLotteryMonth().subscribe(lotteryMonth => {
      this.lotteryMonth = lotteryMonth;
    });

    this.lotterySettingsInfoHttpService.getLotterySettings().subscribe(response => {
      this.lotterySettings = response;
    })

  }


}

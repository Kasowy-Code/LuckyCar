import {Component, OnInit} from '@angular/core';
import {LotterySettingsInfoHttpService} from "../shared/services/lottery-settings-info-http.service";
import {RoleService} from "../role.service";

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
})
export class LotteryComponent implements OnInit {
  lotteryMonth = '';

  constructor(private lotterySettingsInfoHttpService: LotterySettingsInfoHttpService,
              public roleService: RoleService) {
  }

  ngOnInit(): void {
    this.lotterySettingsInfoHttpService.getLotteryMonth().subscribe(lotteryMonth => {
      this.lotteryMonth = lotteryMonth;
    });
  }


}

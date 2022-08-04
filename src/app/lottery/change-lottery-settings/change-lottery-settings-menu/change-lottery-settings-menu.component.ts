import {Component, OnInit} from '@angular/core';
import {LotterySettings} from "../../../shared/dto/lottery-settings";
import {DateToChangeTypeEnumService} from "../services/date-to-change-type-enum.service";
import {MatDialog} from "@angular/material/dialog";
import {DateToChangeTypeEnum} from "../DateToChangeTypeEnum";
import {
  ChangeTemporaryLotteryDateFormComponent
} from "../change-lottery-settings-dialog/change-temporary-lottery-date-form/change-temporary-lottery-date-form.component";
import {
  ChangeRegularLotteryDateFormComponent
} from "../change-lottery-settings-dialog/change-regular-lottery-date-form/change-regular-lottery-date-form.component";
import {LotterySettingsInfoHttpService} from "../../../shared/services/lottery-settings-info-http.service";


@Component({
  selector: 'app-change-lottery-settings-menu',
  templateUrl: './change-lottery-settings-menu.component.html',
  styleUrls: ['./change-lottery-settings-menu.component.scss']
})
export class ChangeLotterySettingsMenuComponent implements OnInit {
  public lotterySettings = <LotterySettings>{};

  constructor(public dateToChangeTypeEnumService: DateToChangeTypeEnumService,
              private changeLotterySettingsDialog: MatDialog,
              private lotterySettingsInfoHttpService: LotterySettingsInfoHttpService) {
  }

  ngOnInit(): void {
    this.lotterySettingsInfoHttpService.getLotterySettings().subscribe(response => {
      this.lotterySettings = response;
    });
  }

  public openChangeLotterySettingsDialog() {

    if (this.dateToChangeTypeEnumService.dateToChangeType === DateToChangeTypeEnum.REGULAR) {
      let dialogRef = this.changeLotterySettingsDialog.open(ChangeRegularLotteryDateFormComponent,
        {
          disableClose: true,
        });

      dialogRef.afterClosed().subscribe(response => {

      });
    } else if (this.dateToChangeTypeEnumService.dateToChangeType === DateToChangeTypeEnum.TEMPORARY) {
      let dialogRef = this.changeLotterySettingsDialog.open(ChangeTemporaryLotteryDateFormComponent,
        {
          disableClose: true,
        });

      dialogRef.afterClosed().subscribe(response => {

      });
    }
  }

}

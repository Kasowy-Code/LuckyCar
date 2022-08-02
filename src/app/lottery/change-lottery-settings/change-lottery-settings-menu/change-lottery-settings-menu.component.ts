import {Component, OnInit} from '@angular/core';
import {LotterySettings} from "../../../shared/dto/lottery-settings";
import {DateToChangeTypeEnumService} from "../services/date-to-change-type-enum.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ChangeLotterySettingsDialogComponent
} from "../change-lottery-settings-dialog/change-lottery-settings-dialog.component";


@Component({
  selector: 'app-change-lottery-settings-menu',
  templateUrl: './change-lottery-settings-menu.component.html',
  styleUrls: ['./change-lottery-settings-menu.component.scss']
})
export class ChangeLotterySettingsMenuComponent implements OnInit {
  lotterySettings = <LotterySettings>{};

  constructor(public dateToChangeTypeEnumService: DateToChangeTypeEnumService,
              private changeLotterySettingsDialog: MatDialog,) {
  }

  ngOnInit(): void {
  }

  public openChangeLotterySettingsDialog() {
    let dialogRef = this.changeLotterySettingsDialog.open(ChangeLotterySettingsDialogComponent,
      {});

    dialogRef.afterClosed().subscribe(response => {

    });
  }

}

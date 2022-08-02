import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DateToChangeTypeEnumService} from "../services/date-to-change-type-enum.service";

class DialogData {
}

@Component({
  selector: 'app-change-lottery-settings-dialog',
  templateUrl: './change-lottery-settings-dialog.component.html',
  styleUrls: ['./change-lottery-settings-dialog.component.scss']
})
export class ChangeLotterySettingsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChangeLotterySettingsDialogComponent>,
              public dateToChangeTypeEnum: DateToChangeTypeEnumService) {
  }

  ngOnInit(): void {

  }

}

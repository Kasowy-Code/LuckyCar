import {Component, OnInit} from '@angular/core';
import {ChangeLotterySettingsHttpService} from "../../services/change-lottery-settings-http.service";
import {Time} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {DateRange} from "@angular/material/datepicker";

@Component({
  selector: 'app-change-temporary-lottery-date-form',
  templateUrl: './change-temporary-lottery-date-form.component.html',
  styleUrls: ['./change-temporary-lottery-date-form.component.scss']
})
export class ChangeTemporaryLotteryDateFormComponent implements OnInit {
  selectedDate: Date | null = null;
  selectedHour: Time | null = null;
  minDate: (Date & DateRange<Date>) | Date | null = null;
  maxDate: (Date & DateRange<Date>) | Date | null = null;

  constructor(public changeLotterySettingsHttpService: ChangeLotterySettingsHttpService,
              public dialogRef: MatDialogRef<ChangeTemporaryLotteryDateFormComponent>) {

  }

  ngOnInit(): void {
    this.setCalendarDateRange();
  }

  setCalendarDateRange() {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
  }

  onSubmit() {

    if (this.selectedDate && this.selectedHour) {
      this.changeLotterySettingsHttpService.changeTemporaryLotteryDate(this.selectedDate, this.selectedHour).subscribe(response => {

        this.dialogRef.close();
      })
    }
  }

  onCancelClick() {

    this.dialogRef.close();
  }
}

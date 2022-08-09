import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ReserveAdminButtonDialogComponent} from "./reserve-admin-button-dialog/reserve-admin-button-dialog.component";
import {CalendarDataService} from "../../services/calendar-data.service";

@Component({
  selector: 'app-reserve-admin-button',
  templateUrl: './reserve-admin-button.component.html',
  styleUrls: ['./reserve-admin-button.component.scss']
})
export class ReserveAdminButtonComponent implements OnInit {
  startDate = new Date();
  endDate = new Date();
  start = '';
  end: any;
  parkingId = -1;

  constructor(private dialog: MatDialog, private calendarService: CalendarDataService) {
  }

  ngOnInit() {

  }

  test() {
    this.parkingId = this.calendarService.selectedParkingLot.id;
    //@ts-ignore
    this.startDate = this.calendarService.selectedRangeValue.start;
    //@ts-ignore
    this.endDate = this.calendarService.selectedRangeValue.end;
    this.startDate.setDate(this.startDate.getDate() + 1);
    this.start = this.startDate.toISOString().substring(0, 16)
    this.startDate.setDate(this.startDate.getDate() - 1);
    if (this.endDate != null) {
      this.endDate.setDate(this.endDate.getDate() + 1);
      this.end = this.endDate.toISOString().substring(0, 16);
      this.endDate.setDate(this.startDate.getDate() - 1);
    } else {
      this.end = null;
    }

    this.dialog.open(ReserveAdminButtonDialogComponent, {
      width: '280px',
      data: {
        'startDate': this.start,
        'endDate': this.end,
        'parkingLotId': this.parkingId
      }
    });
  }
}

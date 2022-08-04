import {Component, OnInit} from '@angular/core';
import {ParkingLot} from "../../shared/dto/parking-lot";
import {CalendarDataService} from "../services/calendar-data.service";
import {DateRange} from "@angular/material/datepicker";

@Component({
  selector: 'app-calendar-button-toggle-group',
  templateUrl: './calendar-button-toggle-group.component.html',
  styleUrls: ['./calendar-button-toggle-group.component.scss']
})
export class CalendarButtonToggleGroupComponent implements OnInit {

  constructor(public calendarDataService: CalendarDataService) {
  }

  ngOnInit(): void {
  }

  getClickedParking(parkingLot: ParkingLot) {

    this.calendarDataService.clickedParkingLot = parkingLot;

    console.log(this.calendarDataService.clickedParkingLot);
  }

  confirmDateRange() {
    if (this.calendarDataService.selectedRangeValue?.start && !this.calendarDataService.selectedRangeValue?.end) {
      this.calendarDataService.selectedRangeValue = new DateRange<Date>(this.calendarDataService.selectedRangeValue.start, this.calendarDataService.selectedRangeValue.start);

      console.log(this.calendarDataService.selectedRangeValue)
    }
  }
}

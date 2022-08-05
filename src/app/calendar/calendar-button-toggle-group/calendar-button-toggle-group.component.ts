import {Component, OnInit} from '@angular/core';
import {ParkingLot} from "../../shared/dto/parking-lot";
import {CalendarDataService} from "../services/calendar-data.service";
import {DateRange} from "@angular/material/datepicker";
import {UserPossibleAction} from "../user-possible-action-enum";

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
    if(this.calendarDataService.selectedRangeValue.start !== null && this.calendarDataService.selectedRangeValue.end !== null) {

      this.calendarDataService.clickedParkingLot = parkingLot;


      console.log(this.calendarDataService.clickedParkingLot);

      console.log("start");
      console.log(this.calendarDataService.selectedRangeValue.start.getDate());
      console.log(this.calendarDataService.selectedRangeValue.start.getMonth());

      console.log("end");
      console.log(this.calendarDataService.selectedRangeValue.end.getDate());
      console.log(this.calendarDataService.selectedRangeValue.end.getMonth());

      this.calendarDataService.checkIfUserHasParkingPlaceOnParkingLot(parkingLot);

    }
  }



  click() {
    console.log('dupa');
  }
}

import {Component, OnInit} from '@angular/core';
import {ParkingLot} from "../../shared/dto/parking-lot";
import {CalendarDataService} from "../services/calendar-data.service";
import {ParkingLotButtonStyleEnum} from "../enums/parking-lot-button-style-enum";

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

  setClickedParking(parkingLot: ParkingLot) {
    if (parkingLot.parkingLotButtonStyleEnum !== ParkingLotButtonStyleEnum.NOTHING_INTERESTING) {
      this.calendarDataService.selectedParkingLot = parkingLot;
    }
  }
}

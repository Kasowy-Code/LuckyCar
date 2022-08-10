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
    //if (parkingLot.parkingLotButtonStyleEnum !== ParkingLotButtonStyleEnum.NOTHING_INTERESTING) {
    // @ts-ignore

    this.calendarDataService.selectedParkingLot = parkingLot;

    if (parkingLot.parkingLotButtonStyleEnum === ParkingLotButtonStyleEnum.THERE_IS_FREE_PLACE) {
      this.calendarDataService.parkingLotsList.forEach(el => {
        el.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.THERE_IS_FREE_PLACE;
      })

      console.log(parkingLot)
      // @ts-ignore
      this.calendarDataService.parkingLotsList.find(obj => {
        return obj === parkingLot;
      }).parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.THERE_IS_FREE_PLACE_CLICKED;
    } else {
      this.calendarDataService.parkingLotsList.forEach(el => {
        el.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.YOU_HAVE_PARKING_PLACE;
      })

      console.log(parkingLot)
      // @ts-ignore
      this.calendarDataService.parkingLotsList.find(obj => {
        return obj === parkingLot;
      }).parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.YOU_HAVE_PARKING_PLACE_CLICKED;
    }
    //}
  }
}

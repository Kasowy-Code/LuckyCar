import {Component, OnInit} from '@angular/core';
import {CalendarDataService} from "../../services/calendar-data.service";
import {UserPossibleActionEnum} from "../../enums/user-possible-action-enum";

@Component({
  selector: 'app-free-take-button',
  templateUrl: './free-take-button.component.html',
  styleUrls: ['./free-take-button.component.scss']
})
export class FreeTakeButtonComponent implements OnInit {

  constructor(public calendarDataService: CalendarDataService) {
  }

  ngOnInit(): void {
    this.calendarDataService.setUserPossibleActionEnum();
  }

  freeOrTake() {
    console.log(this.calendarDataService.freeTakeButtonActionEnum);

    if (this.calendarDataService.freeTakeButtonActionEnum === UserPossibleActionEnum.FREE_PLACE) {
      this.calendarDataService.freePlace();

    } else if (this.calendarDataService.freeTakeButtonActionEnum === UserPossibleActionEnum.TAKE_PLACE) {
      this.calendarDataService.takePlace();
    }
  }

  log() {
    console.log(this.calendarDataService.selectedParkingLot.parkingLotButtonStyleEnum)
  }
}

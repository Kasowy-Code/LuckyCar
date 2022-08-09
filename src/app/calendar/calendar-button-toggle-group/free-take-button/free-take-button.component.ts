import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarDataService} from "../../services/calendar-data.service";
import {UserPossibleActionEnum} from "../../enums/user-possible-action-enum";

@Component({
  selector: 'app-free-take-button',
  templateUrl: './free-take-button.component.html',
  styleUrls: ['./free-take-button.component.scss']
})
export class FreeTakeButtonComponent implements OnInit {

  @Output()
  buttonClick = new EventEmitter();

  constructor(public calendarDataService: CalendarDataService) {
  }

  ngOnInit(): void {
    this.calendarDataService.setUserPossibleActionEnum();
  }

  freeOrTake() {
    console.log(this.calendarDataService.userPossibleActionEnum);

    console.log(this.calendarDataService.selectedRangeValue)

    if (this.calendarDataService.userPossibleActionEnum === UserPossibleActionEnum.FREE_PLACE) {
      this.calendarDataService.freePlace();
    } else if (this.calendarDataService.userPossibleActionEnum === UserPossibleActionEnum.TAKE_PLACE) {
      this.calendarDataService.takePlace();
    }
  }

  log() {
    console.log(this.calendarDataService.selectedParkingLot.parkingLotButtonStyleEnum)
  }
}

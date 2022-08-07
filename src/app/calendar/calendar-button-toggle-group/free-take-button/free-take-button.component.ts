import {Component, OnInit} from '@angular/core';
import {UserPossibleAction} from "../../user-possible-action";
import {CalendarDataService} from "../../services/calendar-data.service";
import {DateRange} from "@angular/material/datepicker";

@Component({
  selector: 'app-free-take-button',
  templateUrl: './free-take-button.component.html',
  styleUrls: ['./free-take-button.component.scss']
})
export class FreeTakeButtonComponent implements OnInit {

  actionMessage = "Take it"

  // TO WYSYŁA MI DOMINIK ŚWITILIK
  action = '';

  constructor(private calendarDataService: CalendarDataService) {
  }

  ngOnInit(): void {
    const data = this.calendarDataService.getData();
    this.action = data.action;
    this.setAction(this.action);
  }

  setAction(action: string) {
    if (action === UserPossibleAction.FREE_PLACE) {
      this.actionMessage = "Release seat";
    }
    if (action === UserPossibleAction.TAKE_PLACE) {
      this.actionMessage = "Take it";
    }
  }

  freeOrTake(){
    if(this.action === UserPossibleAction.TAKE_PLACE){
      this.calendarDataService.takePlace();
    }
    if(this.action === UserPossibleAction.FREE_PLACE){
      this.calendarDataService.freePlace();
    }
  }
}

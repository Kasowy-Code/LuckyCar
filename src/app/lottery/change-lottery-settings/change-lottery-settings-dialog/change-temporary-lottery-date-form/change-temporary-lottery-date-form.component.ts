import {Component, OnInit} from '@angular/core';
import {ChangeLotterySettingsHttpService} from "../../services/change-lottery-settings-http.service";

@Component({
  selector: 'app-change-temporary-lottery-date-form',
  templateUrl: './change-temporary-lottery-date-form.component.html',
  styleUrls: ['./change-temporary-lottery-date-form.component.scss']
})
export class ChangeTemporaryLotteryDateFormComponent implements OnInit {
  selectedDate = <Date>{};

  constructor(public changeLotterySettingsHttpService: ChangeLotterySettingsHttpService) {
  }

  ngOnInit(): void {
    console.log('osiem')
  }

  changeSelectedDate() {

    this.changeLotterySettingsHttpService.changeTemporaryLotteryDate(this.selectedDate.toISOString()).subscribe(response => {
      console.log(response);
    })
  }
}

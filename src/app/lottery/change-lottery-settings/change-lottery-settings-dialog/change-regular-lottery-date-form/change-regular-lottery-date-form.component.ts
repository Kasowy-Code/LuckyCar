import {Component, OnInit} from '@angular/core';
import {ChangeLotterySettingsHttpService} from "../../services/change-lottery-settings-http.service";


@Component({
  selector: 'app-change-regular-lottery-date-form',
  templateUrl: './change-regular-lottery-date-form.component.html',
  styleUrls: ['./change-regular-lottery-date-form.component.scss']
})
export class ChangeRegularLotteryDateFormComponent implements OnInit {
  selectedDate = <Date>{};

  constructor(public changeLotterySettingsHttpService: ChangeLotterySettingsHttpService) {
  }

  ngOnInit(): void {
    console.log('osiem')
  }


}

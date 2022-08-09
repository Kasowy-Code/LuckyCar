import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LotteryEndDateDto} from "../../dto/lottery-end-date-dto";
import {RegistrationEndWeekEnum} from "../../RegistrationEndWeekEnum";
import {RegistrationEndDayEnum} from "../../RegistrationEndDayEnum";
import {MatDialogRef} from "@angular/material/dialog";
import {Observable, of} from "rxjs";
import {ChangeLotterySettingsHttpService} from "../../services/change-lottery-settings-http.service";


@Component({
  selector: 'app-change-regular-lottery-date-form',
  templateUrl: './change-regular-lottery-date-form.component.html',
  styleUrls: ['./change-regular-lottery-date-form.component.scss']
})
export class ChangeRegularLotteryDateFormComponent {
  public registrationEndWeekList = [
    'First Week',
    'Second Week',
    'Third Week',
    'Fourth Week',
    'Last Week'
  ]

  public registrationEndDayList = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  public registrationEndHourList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  ]

  public dateForm = new FormGroup({
    week: new FormControl('', Validators.required),
    day: new FormControl('', Validators.required),
    hour: new FormControl(),
  });

  constructor(public dialogRef: MatDialogRef<ChangeRegularLotteryDateFormComponent>,
              public changeLotterySettingsHttpService: ChangeLotterySettingsHttpService) {

    this.dateForm.valueChanges.subscribe(response => {
    })
  }

  onSubmit() {


    this.getMappedFormInputsToLotteryEndDateDto().subscribe(resposne => {
      this.changeLotterySettingsHttpService.changeRegularLotteryDate(resposne).subscribe(resposne => {

        this.dialogRef.close('submitted');
      });
    });
  }

  getMappedFormInputsToLotteryEndDateDto(): Observable<LotteryEndDateDto> {
    let lotteryEndDateDto = <LotteryEndDateDto>{};

    switch (this.dateForm.value.week) {
      case 'First Week': {
        lotteryEndDateDto.registrationEndWeek = RegistrationEndWeekEnum.FIRST_WEEK;
        break;
      }
      case 'Second Week': {
        lotteryEndDateDto.registrationEndWeek = RegistrationEndWeekEnum.SECOND_WEEK;
        break;
      }
      case 'Third Week': {
        lotteryEndDateDto.registrationEndWeek = RegistrationEndWeekEnum.THIRD_WEEK;
        break;
      }
      case 'Fourth Week': {
        lotteryEndDateDto.registrationEndWeek = RegistrationEndWeekEnum.FOURTH_WEEK;
        break;
      }
      case 'Last Week': {
        lotteryEndDateDto.registrationEndWeek = RegistrationEndWeekEnum.LAST_WEEK;
        break;
      }
    }

    switch (this.dateForm.value.day) {
      case 'Monday': {
        lotteryEndDateDto.registrationEndDay = RegistrationEndDayEnum.MONDAY;
        break;
      }
      case 'Tuesday': {
        lotteryEndDateDto.registrationEndDay = RegistrationEndDayEnum.TUESDAY;
        break;
      }
      case 'Wednesday': {
        lotteryEndDateDto.registrationEndDay = RegistrationEndDayEnum.WEDNESDAY;
        break;
      }
      case 'Thursday': {
        lotteryEndDateDto.registrationEndDay = RegistrationEndDayEnum.THURSDAY;
        break;
      }
      case 'Friday': {
        lotteryEndDateDto.registrationEndDay = RegistrationEndDayEnum.FRIDAY;
        break;
      }
      case 'Saturday': {
        lotteryEndDateDto.registrationEndDay = RegistrationEndDayEnum.SATURDAY;
        break;
      }
      case 'Sunday': {
        lotteryEndDateDto.registrationEndDay = RegistrationEndDayEnum.SUNDAY;
        break;
      }
    }

    lotteryEndDateDto.registrationEndHour = this.dateForm.value.hour;

    return of(lotteryEndDateDto);
  }

  onCancelClick() {
    this.dialogRef.close('canceled');
  }
}

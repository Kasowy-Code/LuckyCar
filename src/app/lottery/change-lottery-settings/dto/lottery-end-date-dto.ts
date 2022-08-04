import {RegistrationEndDayEnum} from "../RegistrationEndDayEnum";
import {RegistrationEndWeekEnum} from "../RegistrationEndWeekEnum";

export interface LotteryEndDateDto {
  registrationEndHour: any;
  registrationEndDay: RegistrationEndDayEnum;
  registrationEndWeek: RegistrationEndWeekEnum;
}

import {Injectable} from '@angular/core';
import {DateToChangeTypeEnum} from "../DateToChangeTypeEnum";

@Injectable({
  providedIn: 'root'
})
export class DateToChangeTypeEnumService {
  dateToChangeType = DateToChangeTypeEnum.UNDEFINED;

  setRegular() {
    this.dateToChangeType = DateToChangeTypeEnum.REGULAR;
  }

  setTemporary() {
    this.dateToChangeType = DateToChangeTypeEnum.TEMPORARY;
  }
}

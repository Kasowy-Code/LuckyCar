import {Injectable} from '@angular/core';
import {ParkingLot} from "../../shared/dto/parking-lot";
import {ParkingDay} from "../interfaces/parking-day-interface";
import {DateRange} from "@angular/material/datepicker";
import {ParkingDateDTO} from "../interfaces/parking-date-dto";
import {CalendarParkingLotsHttpService} from "./calendar-parking-lots-http.service";
import {UserPossibleAction} from "../user-possible-action";

@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {
  hasParkingOnDays: ParkingDay[] = [];
  parkingLotsOnDay: any = [];
  selectedRangeValue: DateRange<Date> = new DateRange<Date>(null, null);
  parkingLotsList: ParkingLot[] = [];
  loaded = false;
  clickedParkingLot = <ParkingLot>{};

  //DOMINO VARIABLE
  action = UserPossibleAction.TAKE_PLACE;
  parkingId = 3;

  constructor(private calendarParkingLotsHttpService: CalendarParkingLotsHttpService) {
  }

  setMyParkingPlaces() {
    this.calendarParkingLotsHttpService.getMyParkingPlaces().subscribe(
      (date: any) => {
        date.forEach((el: ParkingDateDTO) => {
          const tempDate = new Date(el.date);
          const day: ParkingDay = {day: tempDate.getDate(), month: tempDate.getMonth(), parkingLotId: el.parkingLotId}
          this.hasParkingOnDays.push(day);
        });
        this.loaded = true;
      }
    )
  }

  setParkingLotsOnDay() {
    this.calendarParkingLotsHttpService.getParkingLots().subscribe(
      (data: any) => {
        data.forEach((el: any) => {
          this.parkingLotsList.push(el)
        });

        this.calendarParkingLotsHttpService.getAllParkingPlaces().subscribe(
          (res: any) => {

            res.forEach((el: ParkingDateDTO) => {
                if (!this.parkingLotsOnDay.some((object: any) => {
                  object.date == new Date(el.date)
                })) {
                  this.parkingLotsOnDay.push({
                    parkingLotsList: JSON.parse(JSON.stringify(this.parkingLotsList)),
                    date: new Date(el.date)
                  });
                }
                const ParkingDay = this.parkingLotsOnDay.find((e: any) => {
                  return e.date.valueOf() === new Date(el.date).valueOf();
                });

                if (new Date(el.date).valueOf() == ParkingDay.date.valueOf()) {
                  ParkingDay.parkingLotsList[el.parkingLotId - 1].parkingPlaceCount -= 1;
                }
              }
            )
            console.log(this.parkingLotsOnDay);
          }
        )
      }
    )
    this.setMyParkingPlaces();
  }

  //DOMINO
  getData(){
    return {
      "action": this.action
    }
  }

  //TO USTAWIA DOMINIK
  setData(action:any, parkingId:number){
    this.action = action;
    this.parkingId = parkingId;
  }

  freePlace(){
    const days = [];
    // @ts-ignore
    const start = new Date(this.selectedRangeValue.start);
    // @ts-ignore
    const end = new Date(this.selectedRangeValue.end);
    let loop = new Date(start);
    loop.setDate(loop.getDate()+1);
    while (loop <= end) {
      days.push(loop.toISOString().substring(0,16));
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
    days.push(loop.toISOString().substring(0,16));
    this.calendarParkingLotsHttpService.freePlace(days).subscribe(()=>{});
  }

  takePlace(){
    //@ts-ignore
    let day = new Date(this.selectedRangeValue.start);
    day.setDate(day.getDate()+1);
    const parkingId = this.parkingId;

    this.calendarParkingLotsHttpService.takePlace(day.toISOString().substring(0,16), parkingId).subscribe(()=>{});
  }
}


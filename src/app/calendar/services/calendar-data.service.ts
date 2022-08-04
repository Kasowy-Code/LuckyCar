import {Injectable} from '@angular/core';
import {ParkingLot} from "../../shared/dto/parking-lot";
import {ParkingDay} from "../interfaces/parking-day-interface";
import {DateRange} from "@angular/material/datepicker";
import {ParkingDateDTO} from "../interfaces/parking-date-dto";
import {CalendarParkingLotsHttpService} from "./calendar-parking-lots-http.service";

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
}

import {Injectable} from '@angular/core';
import {ParkingLot} from "../../shared/dto/parking-lot";
import {ParkingDay} from "../interfaces/parking-day-interface";
import {DateRange} from "@angular/material/datepicker";
import {ParkingDateDTO} from "../interfaces/parking-date-dto";
import {CalendarParkingLotsHttpService} from "./calendar-parking-lots-http.service";
import {ParkingLotButtonStyleEnum} from "../parking-lot-button-style-enum";


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

  confirmDateRange() {
    if (this.selectedRangeValue?.start && !this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(this.selectedRangeValue.start, this.selectedRangeValue.start);

      console.log(this.selectedRangeValue)
    }
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
    this.calendarParkingLotsHttpService.getParkingLots().subscribe(data => {
        this.parkingLotsList = data.filter(value => value.isAvailable)

        this.parkingLotsList.forEach(parkingLot => {
          if (parkingLot.id === 2) {
            parkingLot.freeParkingPlaces = 1;
          } else {
            parkingLot.freeParkingPlaces = 0;
          }

          parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.NOTHING_INTERESTING;
        })


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
            console.log(this.hasParkingOnDays);
          }
        )
      }
    )
    this.setMyParkingPlaces();
  }

  calculateFreeParkingPlacesForParking() {

  }

  setParkingLotsButtonStyle() {
    console.log("wszedlem do setParking...")

    this.parkingLotsList.forEach(parkingLot => {

      console.log(this.checkIfUserHasParkingPlaceOnParkingLot(parkingLot));

      if (this.checkIfUserHasParkingPlaceOnParkingLot(parkingLot)) {
        parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.YOU_HAVE_PARKING_PLACE;
      } else {
        parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.NOTHING_INTERESTING;

      }
    })
  }

  checkIfUserHasParkingPlaceOnParkingLot(parkingLot: ParkingLot) {

    let userHasParkingPlaceOnRange = true;

    let start = this.selectedRangeValue.start;
    let end = this.selectedRangeValue.end;

    if(end === null) {
      end = start;
    }

    console.log('start ' + start + 'end ' + end)

    if (start !== null && end !== null) {
      let currentIteratedDate = new Date(start);

      while (currentIteratedDate <= end) {
        let userHasParkingPlaceOnDay = false;

        this.hasParkingOnDays.forEach(element => {

          if (element.parkingLotId === parkingLot.id) {
            if (element.day === currentIteratedDate.getDate() && element.month === currentIteratedDate.getMonth()) {
              userHasParkingPlaceOnDay = true;
            }
          }
        })

        if (!userHasParkingPlaceOnDay) {
          userHasParkingPlaceOnRange = false;
          return userHasParkingPlaceOnRange;
        }

        let newDate = currentIteratedDate.setDate(currentIteratedDate.getDate() + 1);
        currentIteratedDate = new Date(newDate);

      }
    }

    return userHasParkingPlaceOnRange;

  }
}

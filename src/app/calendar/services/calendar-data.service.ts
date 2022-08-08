import {Injectable} from '@angular/core';
import {ParkingLot} from "../../shared/dto/parking-lot";
import {ParkingDay} from "../interfaces/parking-day-interface";
import {DateRange} from "@angular/material/datepicker";
import {ParkingDateDTO} from "../interfaces/parking-date-dto";
import {CalendarParkingLotsHttpService} from "./calendar-parking-lots-http.service";
import {ParkingLotButtonStyleEnum} from "../calendar-button-toggle-group/enums/parking-lot-button-style-enum";
import {ParkingPlaceDay} from "../../shared/dto/parking-place-day";


@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {
  hasParkingOnDays: ParkingDay[] = [];
  parkingLotsOnDay: any = [];
  selectedRangeValue: DateRange<Date> = new DateRange<Date>(null, null);
  loaded = false;
  allParkingPlaceList = <ParkingPlaceDay[]>[];

  //TODO dane potrzebne Domino
  parkingLotsList: ParkingLot[] = [];
  selectedParkingLot = <ParkingLot>{};

  constructor(private calendarParkingLotsHttpService: CalendarParkingLotsHttpService) {
  }

  confirmDateRange(parkingLot: ParkingLot) {
    if (parkingLot.parkingLotButtonStyleEnum !== ParkingLotButtonStyleEnum.NOTHING_INTERESTING) {

      if (this.selectedRangeValue?.start && !this.selectedRangeValue?.end) {
        this.selectedRangeValue = new DateRange<Date>(this.selectedRangeValue.start, this.selectedRangeValue.start);
      }
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
          parkingLot.freeParkingPlaces = parkingLot.parkingPlaceCount;

          parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.NOTHING_INTERESTING;
        })


        this.calendarParkingLotsHttpService.getAllParkingPlaces().subscribe(
          (res: any) => {
            res.forEach((el: ParkingDateDTO) => {
                if (!this.parkingLotsOnDay.some((object: any) =>  object.date.valueOf() == new Date(el.date).valueOf())) {
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
          }
        )
      }
    )
    this.setMyParkingPlaces();
  }

  setParkingLotsFreePlacesToMax() {
    this.parkingLotsList.forEach(parkingLot => {
      parkingLot.freeParkingPlaces = parkingLot.parkingPlaceCount;

      parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.NOTHING_INTERESTING;
    })
  }

  ifShouldShowFreeParkingPlaces() {
    if (this.selectedRangeValue.start) {

      if (this.selectedRangeValue.end === null) {
        return true;
      } else if (this.selectedRangeValue.end.getMonth() === this.selectedRangeValue.start.getMonth() && this.selectedRangeValue.end.getDate() === this.selectedRangeValue.start.getDate()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  countFreeParkingPlacesOnEachParkingLot() {
    if (this.ifShouldShowFreeParkingPlaces()) {
      this.calendarParkingLotsHttpService.getAllParkingPlaces().subscribe(response => {
        // console.log(response);
        // console.log(this.selectedRangeValue);

        this.allParkingPlaceList = response;
        // console.log(this.allParkingPlaceList[0].date);

        this.allParkingPlaceList.forEach(parkingPlace => {

          let dateToCompare = new Date(parkingPlace.date)

          this.parkingLotsList.forEach(parkingLot => {

            // console.log("their parkingLot id " + parkingPlace.parkingLotId)
            // console.log("ours parkingLot id  " + parkingLot.id)


            // @ts-ignore
            if (parkingLot.id === parkingPlace.parkingLotId && dateToCompare.getDate() === this.selectedRangeValue.start.getDate() && dateToCompare.getMonth() === this.selectedRangeValue.start.getMonth()) {
              parkingLot.freeParkingPlaces--;
            }

          });
        });
      });
    }
  }

  checkIfThereIsFreeParkingPlaceOnParkingLot(parkingLot: ParkingLot) {
    if (this.ifShouldShowFreeParkingPlaces()) {
      if (parkingLot.freeParkingPlaces > 0) {
        return true;
      }
    }
    return false;
  }

  checkIfUserHasParkingPlaceOnParkingLot(parkingLot: ParkingLot) {

    let userHasParkingPlaceOnRange = true;
    let start = this.selectedRangeValue.start;
    let end = this.selectedRangeValue.end;

    if (end === null) {
      end = start;
    }
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

  setParkingLotsButtonStyle() {
    let hasParking = false;

    this.parkingLotsList.forEach(parkingLot => {
      if (this.checkIfUserHasParkingPlaceOnParkingLot(parkingLot)) {
        parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.YOU_HAVE_PARKING_PLACE;
        hasParking = true;
      }
    })

    if (!hasParking) {
      this.parkingLotsList.forEach(parkingLot => {
        if (this.checkIfThereIsFreeParkingPlaceOnParkingLot(parkingLot)) {
          console.log(parkingLot);
          parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.THERE_IS_FREE_PLACE;
          console.log("dupa")
        } else {

          console.log(parkingLot)
          parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.NOTHING_INTERESTING;
        }
      })
    }
  }

  clearSelectedParkingLot() {
    this.selectedParkingLot = <ParkingLot>{};
  }
  checkPossibleActions() {
    if(!this.hasParkingOnDays.some(el => el.day === this.selectedRangeValue.start?.getDate() && el.month === this.selectedRangeValue.start?.getMonth())) {
      if (this.selectedRangeValue?.start && !this.selectedRangeValue?.end) {
        this.selectedRangeValue = new DateRange<Date>(this.selectedRangeValue.start, this.selectedRangeValue.start);
      }
    }
  }
}

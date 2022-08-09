import {Injectable} from '@angular/core';
import {ParkingLot} from "../../shared/dto/parking-lot";
import {ParkingDay} from "../interfaces/parking-day-interface";
import {DateRange} from "@angular/material/datepicker";
import {ParkingDateDTO} from "../interfaces/parking-date-dto";
import {CalendarParkingLotsHttpService} from "./calendar-parking-lots-http.service";
import {ParkingLotButtonStyleEnum} from "../enums/parking-lot-button-style-enum";
import {ParkingPlaceDay} from "../../shared/dto/parking-place-day";
import {UserPossibleActionEnum} from "../enums/user-possible-action-enum";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {
  hasParkingOnDays: ParkingDay[] = [];
  parkingLotsOnDay: any = [];
  loaded = false;
  allParkingPlaceList = <ParkingPlaceDay[]>[];

  selectedRangeValue: DateRange<Date> = new DateRange<Date>(null, null);
  parkingLotsList: ParkingLot[] = [];
  selectedParkingLot = <ParkingLot>{};
  userPossibleActionEnum = UserPossibleActionEnum.NOTHING_TO_DO;

  constructor(private calendarParkingLotsHttpService: CalendarParkingLotsHttpService,
              private snackBar: MatSnackBar) {
  }

  setupCalendarComponentData() {
    this.userPossibleActionEnum = UserPossibleActionEnum.NOTHING_TO_DO;
    this.setParkingLotsList();
    this.setAllParkingPlace();
    this.setMyParkingPlaces();
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
    this.calendarParkingLotsHttpService.getAllParkingPlaces().subscribe(
      (res: any) => {
        res.forEach((el: ParkingDateDTO) => {
          if (!this.parkingLotsOnDay.some((object: any) => object.date.valueOf() == new Date(el.date).valueOf())) {
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
        })
      })
  }

  setParkingLotsFreePlacesToMax() {
    this.parkingLotsList.forEach(parkingLot => {
      parkingLot.freeParkingPlaces = parkingLot.parkingPlaceCount;

      parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.NOTHING_INTERESTING;
    })
  }

  setAllParkingPlace() {
    this.calendarParkingLotsHttpService.getAllParkingPlaces().subscribe(response => {
      this.allParkingPlaceList = response;
    });
  }

  setParkingLotsList() {
    this.calendarParkingLotsHttpService.getParkingLots().subscribe(response => {
      this.parkingLotsList = response.filter((value: any) => value.isAvailable);

      this.setParkingLotsOnDay();
    })
  }

  setParkingLotsButtonStyle() {
    this.userPossibleActionEnum = UserPossibleActionEnum.NOTHING_TO_DO;
    this.setParkingLotsFreePlacesToMax();

    // if data sie nie zgadza i nie ma losowania, then nothing interesting

    if (this.selectedRangeValue.start !== null) {
      let hasParking = false;

      this.parkingLotsList.forEach(parkingLot => {
        if (this.checkIfUserHasParkingPlaceOnParkingLot(parkingLot)) {
          parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.YOU_HAVE_PARKING_PLACE;
          hasParking = true;
        }
      })

      this.countFreeParkingPlacesOnEachParkingLot()

      if (!hasParking) {
        if (this.ifShouldShowFreeParkingPlaces()) {
          this.parkingLotsList.forEach(parkingLot => {
            if (this.checkIfThereIsFreeParkingPlaceOnParkingLot(parkingLot)) {
              parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.THERE_IS_FREE_PLACE;

            } else {
              parkingLot.parkingLotButtonStyleEnum = ParkingLotButtonStyleEnum.NOTHING_INTERESTING;
            }
          })
        }
      }
    }
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

    this.allParkingPlaceList.forEach(parkingPlace => {

      let dateToCompare = new Date(parkingPlace.date)

      this.parkingLotsList.forEach(parkingLot => {

        // @ts-ignore
        if (parkingLot.id === parkingPlace.parkingLotId && dateToCompare.getDate() === this.selectedRangeValue.start.getDate() && dateToCompare.getMonth() === this.selectedRangeValue.start.getMonth() && parkingPlace.userId !== null) {
          
          parkingLot.freeParkingPlaces--;
        }
      });
    });
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

  setUserPossibleActionEnum() {
    this.userPossibleActionEnum = UserPossibleActionEnum.NOTHING_TO_DO;

    if (this.selectedParkingLot.parkingLotButtonStyleEnum === ParkingLotButtonStyleEnum.YOU_HAVE_PARKING_PLACE) {
      this.userPossibleActionEnum = UserPossibleActionEnum.FREE_PLACE;
    } else if (this.selectedParkingLot.parkingLotButtonStyleEnum === ParkingLotButtonStyleEnum.THERE_IS_FREE_PLACE) {
      this.userPossibleActionEnum = UserPossibleActionEnum.TAKE_PLACE;
    }
  }

  freePlace() {
    if (this.selectedRangeValue.start != null && this.selectedRangeValue.end != null) {

      const days = [];

      const start = new Date(this.selectedRangeValue.start);

      const end = new Date(this.selectedRangeValue.end);
      let loop = new Date(start);

      loop.setDate(loop.getDate() + 1);
      while (loop <= end) {
        days.push(loop.toISOString().substring(0, 16));
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }
      days.push(loop.toISOString().substring(0, 16));
      this.calendarParkingLotsHttpService.freePlace(days).subscribe(() => {
        this.snackBar.open("Parking place has been freed", "", {
          duration: 5 * 1000,
          panelClass: ['good-snackbar'],
          horizontalPosition: "end",
          verticalPosition: "top",
        });

        this.setupCalendarComponentData();
      });
    }
  }

  takePlace() {
    if (this.selectedRangeValue.start !== null) {

      let day = new Date(this.selectedRangeValue.start);
      day.setDate(day.getDate() + 1);
      const parkingId = this.selectedParkingLot.id;

      this.calendarParkingLotsHttpService.takePlace(day.toISOString().substring(0, 16), parkingId).subscribe(() => {

        this.setupCalendarComponentData();
      });
    }
  }
}

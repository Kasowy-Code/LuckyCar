import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {DateRange, MatCalendar, MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {CalendarDataService} from "./services/calendar-data.service";
import {CalendarParkingLotsHttpService} from "./services/calendar-parking-lots-http.service";

//TODO pozwól wybrać tylko datę większą lub równą dzisiejszej
//i zrobimy to tak, że jeżeli wybrałes date inną niż powinieneś to parkingi się nie podświetlają
// jeśli nie ma losowania, to też nie można klikać

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnDestroy {

  @ViewChild(MatCalendar)
    // @ts-ignore
  calendar: MatCalendar<Date>;

  selected: Date | undefined;
  lotteryEndDate: string = '';
  minDate: (Date & DateRange<Date>) | Date | null;
  maxDate: (Date & DateRange<Date>) | Date | null;

  dateClass: MatCalendarCellClassFunction<Date> = this.getMatCalendarCellClassFunction();

  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  constructor(public calendarDataService: CalendarDataService,
              public calendarParkingLotsHttpService: CalendarParkingLotsHttpService) {

    const currentDate = new Date();
    //TODO zmienić na pobiernaie miesiąca z bazy
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
  }

  ngOnInit() {
    this.calendarDataService.setupCalendarComponentData();

    this.calendarParkingLotsHttpService.getDrawEndDate().subscribe((res: any) => {
      if (res.temporaryDrawDate) {
        this.lotteryEndDate = res.temporaryDrawDate;
      } else {
        this.lotteryEndDate = res.drawDate;
      }
      console.log(this.lotteryEndDate);
    })
  }

  onButtonClick() {
    this.calendar.updateTodaysDate();
  }

  ngOnDestroy() {
    this.calendarDataService.parkingLotsList.splice(0);
  }

  selectedRangeChange(m: any) {
    if (!this.calendarDataService.selectedRangeValue?.start || this.calendarDataService.selectedRangeValue?.end) {
      this.calendarDataService.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.calendarDataService.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.calendarDataService.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.calendarDataService.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.selectedRangeValueChange.emit(this.calendarDataService.selectedRangeValue)

    this.calendarDataService.setParkingLotsButtonStyle();
  }

  public getMatCalendarCellClassFunction(): MatCalendarCellClassFunction<Date> {
    return (cellDate, view) => {
      if (view == "month") {

        console.log(cellDate, view);

        if (this.calendarDataService.hasParkingOnDays.some(item => item.day == new Date(cellDate).getDate() && item.month == new Date(cellDate).getMonth())) {
          return 'have-parking';
        }
        this.calendarParkingLotsHttpService.getAllParkingPlaces().subscribe(response => {

          this.calendarDataService.allParkingPlaceList = response;

          this.calendarDataService.allParkingPlaceList.forEach(parkingPlace => {

            let dateToCompare = new Date(parkingPlace.date)

            this.calendarDataService.parkingLotsList.forEach(parkingLot => {

              if (parkingLot.id === parkingPlace.parkingLotId && dateToCompare.getDate() === new Date(cellDate).getDate() && dateToCompare.getMonth() === new Date(cellDate).getMonth()) {
                parkingLot.freeParkingPlaces--;
              }

            });
          });
        });

        if (this.calendarDataService.parkingLotsList.some((el: any) => el.freeParkingPlaces > 0) && cellDate > new Date() && cellDate <= new Date(this.lotteryEndDate)) {
          return 'available-parking';
        }
        // if(this.calendarDataService.hasParkingOnDays.some(item => item.day == cellDate.getDate() && item.month == cellDate.getMonth())) {}
      }
      return "";
    };
  }
}

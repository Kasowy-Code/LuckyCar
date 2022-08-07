import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DateRange, MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {CalendarDataService} from "./services/calendar-data.service";

//TODO pozwól wybrać tylko datę większą lub równą dzisiejszej
//i zrobimy to tak, że jeżeli wybrałes date inną niż powinieneś to parkingi się nie podświetlają

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnDestroy {
  selected: Date | undefined;

  minDate: (Date & DateRange<Date>) | Date | null;
  maxDate: (Date & DateRange<Date>) | Date | null;

  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  constructor(public calendarDataService: CalendarDataService) {

    const currentDate = new Date();
    //TODO zmienić na pobiernaie miesiąca z bazy
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
  }

  ngOnInit() {
    this.calendarDataService.setParkingLotsOnDay();
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
    this.selectedRangeValueChange.emit(this.calendarDataService.selectedRangeValue);
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view == "month") {
      return this.calendarDataService.hasParkingOnDays.some(item => item.day == cellDate.getDate() && item.month == cellDate.getMonth()) ? 'have-parking' : '';
    }
    return "";
  };
}

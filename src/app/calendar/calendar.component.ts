import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DateRange, MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {HttpClient} from "@angular/common/http";
import {ParkingLot} from "../shared/dto/parking-lot";
import {CalendarParkingLotsHttpService} from "./services/calendar-parking-lots-http.service";
import {ParkingDay} from "./interfaces/parking-day-interface";
import {ParkingDateDTO} from "./interfaces/parking-date-dto";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  parkingLots: ParkingLot[] = [];
  hasParkingOnDays: ParkingDay[] = [];
  selected: Date | undefined;

  minDate: (Date & DateRange<Date>) | Date | null;
  maxDate: (Date & DateRange<Date>) | Date | null;

  loaded = false;
  currentParking = <ParkingLot>{};

  @Input() selectedRangeValue: DateRange<Date> = new DateRange<Date>(null, null);
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  constructor(private http: HttpClient, private parkingService: CalendarParkingLotsHttpService) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
  }

  ngOnInit() {
    this.parkingService.getParkingLots().subscribe(
      (data: any) => {
        data.forEach((el: any) => {
          this.parkingLots.push(el)
        });
      }
    )
    this.parkingService.getMyParkingPlaces().subscribe(
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

  selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
    console.log(this.selectedRangeValue);
  }

  confirmDateRange() {
    if (this.selectedRangeValue?.start && !this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(this.selectedRangeValue.start, this.selectedRangeValue.start);
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view == "month") {
      return this.hasParkingOnDays.some(item => item.day == cellDate.getDate() && item.month == cellDate.getMonth()) ? 'have-parking' : '';
    }
    return "";
  };

  //TODO Dominik, masz gotową funkcje
  getClickedParking(parkingLot: ParkingLot) {

    this.currentParking = parkingLot;

    console.log(this.currentParking);
  }
}

import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DateRange, MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {HttpClient} from "@angular/common/http";
import {CalendarParkingsService} from "./services/calendar-parkings.service";

interface ParkingDateDTO {
  parkingLotId: number,
  userId: number,
  date: Date
}

interface ParkingDay {
  day: number,
  month: number
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  parkingLots: any = [];
  parkingLotsOnDay: any = [];
  hasParkingOnDays: ParkingDay[] = [];
  selected: Date | undefined;
  minDate: (Date & DateRange<Date>) | Date | null;
  maxDate: (Date & DateRange<Date>) | Date | null;
  loaded = false;
  @Input() selectedRangeValue: DateRange<Date> = new DateRange<Date>(null, null);
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  constructor(private http: HttpClient, private parkingService: CalendarParkingsService) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
  }

  ngOnInit() {
    this.parkingService.getParkings().subscribe(
      (data: any) => {
        // console.log(data);
        data.forEach((el: any) => {
          this.parkingLots.push(el)
        });

        this.parkingService.getAllParkingPlaces().subscribe(
          (res: any) => {
             // console.log(res);

            res.forEach((el: ParkingDateDTO) => {
              if(!this.parkingLotsOnDay.some((object: any) => {object.date == new Date(el.date)})) {
                this.parkingLotsOnDay.push({parkingLots: JSON.parse(JSON.stringify(this.parkingLots)), date: new Date(el.date)});
              }
              // console.log(this.parkingLotsOnDay);
              const ParkingDay = this.parkingLotsOnDay.find((e: any) => {
                return e.date.valueOf() === new Date(el.date).valueOf();
              });

              if(new Date(el.date).valueOf() == ParkingDay.date.valueOf()) {
                ParkingDay.parkingLots[el.parkingLotId - 1].parkingPlaceCount -= 1;
              }
              // console.log(ParkingDay);
            }
            )
             // console.log(this.parkingLotsOnDay);
             // console.log(this.parkingLotsOnDay[0].parkingLots);
            // res.forEach((el: any) => {
            //
            //   this.parkingLotsOnDay.parkingLots[el.parkingLotId].parkingPlaceCount -= 1;
            //
            // })
             // console.log(this.parkingLotsOnDay);
          }
        )
      }
    )
    this.parkingService.getMyParkingPlaces().subscribe(
      (date: any) => {
        date.forEach((el: ParkingDateDTO) => {
          const tempDate = new Date(el.date);
          const day: ParkingDay = {day: tempDate.getDate(), month: tempDate.getMonth()}
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
}

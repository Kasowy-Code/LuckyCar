import {Component, OnInit} from '@angular/core';

class Parking {
  constructor(value: string, viewValue: string) {
    this.value = value;
    this.viewValue = viewValue;
  }

  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selected: Date | null | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  parkings: Parking[] = [
    {value: 'Parking-0', viewValue: 'Parking 1'},
    {value: 'Parking-1', viewValue: 'Parking 2'},
    {value: 'Parking-2', viewValue: 'Parking 3'},
  ];
  selectedValue: any = 'Parking-0';
}

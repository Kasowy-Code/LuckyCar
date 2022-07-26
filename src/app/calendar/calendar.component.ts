import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../rest-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selected: Date | null | undefined;
  constructor(private service:RestApiService, private router:Router) { }

  ngOnInit(): void {
  }
}

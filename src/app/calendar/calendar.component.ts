import { Component, OnInit } from '@angular/core';
import {LoginService} from "../Auth/login/services/login.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  selected: Date | null | undefined;
  constructor(private service:LoginService, private router:Router) { }

}

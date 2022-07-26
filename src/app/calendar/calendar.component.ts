import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../rest-api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  selected: Date | null | undefined;
  constructor(private service:RestApiService, private router:Router) { }

  ngOnInit(): void {
    this.service.checkTokenAdmin().subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        if(err instanceof  HttpErrorResponse){
          if(err.status === 401) {
            this.router.navigate(['/login']);
          }
          // if(err.status === 403) {  // Jesli jestes adminem
          //   this.router.navigate(['/login']);
          // }
        }
      });
  }
}

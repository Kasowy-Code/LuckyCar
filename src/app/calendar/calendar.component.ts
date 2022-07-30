import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RoleService} from "../role.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  selected: Date | null | undefined;
  constructor(private roleService:RoleService) { }

  ngOnInit(){
    // DO KOMPONENTOW ADMIN ZWRACA TRUE JESLI POSIADA ADMINA
    // TODO: Przenieść do RoleGuard
    console.log(this.roleService.isAdmin())
  }
}

import { Component, OnInit } from '@angular/core';
import {LogoutService} from "../Auth/services/logout.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private logoutService:LogoutService) { }

  ngOnInit(): void {
  }

  logout(){
    this.logoutService.logout();
  }

}

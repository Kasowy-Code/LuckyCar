import { Component, OnInit } from '@angular/core';
import {LogoutService} from "../Auth/services/logout.service";
import {RoleService} from "../role.service";
import {AccountService} from "./services/account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  loading = false;

  constructor(private logoutService:LogoutService, public roleService:RoleService,
              private accountService:AccountService) { }

  ngOnInit(): void {
  }

  logout(){
    this.logoutService.logout();
  }

  changePassword(){
    this.loading = true;
    this.accountService.changePassword().subscribe(()=>{this.loading = false});
  }

}

import { Component, OnInit } from '@angular/core';
import {LogoutService} from "../Auth/services/logout.service";
import {RoleService} from "../role.service";
import {AccountService} from "./services/account.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  loading = false;
  delete = false;

  constructor(private logoutService:LogoutService, public roleService:RoleService,
              private accountService:AccountService, private router:Router,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.accountService.adminAmount().subscribe(data=>{
        if(data === 'true'){
          this.delete = true;
        }else {
          this.delete = false;
        }
      }
    )
  }

  logout(){
    this.logoutService.logout();
  }

  changePassword(){
    this.loading = true;
    this.accountService.changePassword().subscribe(()=>{this.loading = false});
  }

  deleteAccountDialog(){
    this.dialog.open(DialogComponent, {
      width: '250px'
    });
  }

  getUsers(){
    this.router.navigate(["/users"]);
  }
}


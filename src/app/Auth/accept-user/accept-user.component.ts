import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AcceptUserService} from "./services/accept-user.service";
import {RoleService} from "../../role.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LogoutService} from "../services/logout.service";

@Component({
  selector: 'app-accept-user',
  templateUrl: './accept-user.component.html',
  styleUrls: ['./accept-user.component.css']
})
export class AcceptUserComponent implements OnInit {

  id = this.route.snapshot.params['id'];

  constructor(private route:ActivatedRoute, private service:AcceptUserService,
              private roleService:RoleService, private router:Router,
              private _snackBar: MatSnackBar, private logoutService:LogoutService) { }

  ngOnInit(): void {
    this.acceptUser();
  }

  acceptUser(){
    if(this.roleService.isAdmin()) {
      this.service.acceptUser(this.id).subscribe(
        (data) => {},
          error => {
          if(error.status === 400){
            this._snackBar.open("This user does not exist", "Ok");
          }
          if(error.status === 404) {
            this._snackBar.open("This user was approved earlier", "Ok");
          }
          if(error.status === 401){
            this.logoutService.logout();
          }
        }
      )
    }else{
        this.router.navigate(["/calendar"]);
    }
  }
}

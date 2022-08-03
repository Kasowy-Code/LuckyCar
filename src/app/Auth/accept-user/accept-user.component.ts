import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AcceptUserService} from "./services/accept-user.service";
import {RoleService} from "../../role.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-accept-user',
  templateUrl: './accept-user.component.html',
  styleUrls: ['./accept-user.component.css']
})
export class AcceptUserComponent implements OnInit {

  id = this.route.snapshot.params['id'];
  h1 = "User has been accepted";
  p = "A message with the password setting form has been sent to the user";

  constructor(private route:ActivatedRoute, private service:AcceptUserService,
              private roleService:RoleService, private router:Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.acceptUser();
  }

  changeMessage(){
    this.p = "This user does not exist!";
    this.h1 = "This user cannot be accepted";
  }

  acceptUser(){
      this.service.acceptUser(this.id).subscribe(
        (data) => {})
  }
}

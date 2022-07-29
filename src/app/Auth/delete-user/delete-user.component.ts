import { Component, OnInit } from '@angular/core';
import {RoleService} from "../../role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteUserService} from "./services/delete-user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LogoutService} from "../services/logout.service";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  id = this.route.snapshot.params['id'];

  constructor(private roleService:RoleService, private route:ActivatedRoute,
              private service:DeleteUserService, private _snackBar:MatSnackBar,
              private router:Router, private logoutService:LogoutService) { }

  ngOnInit(): void {
    this.deleteUser();
  }

  deleteUser(){
      this.service.deleteUser(this.id).subscribe(
        (data) => {});
  }
}

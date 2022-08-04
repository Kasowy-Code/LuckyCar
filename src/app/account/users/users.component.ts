import { Component, OnInit } from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {UserDialogComponent} from "../user-dialog/user-dialog.component";
import {RoleService} from "../../role.service";

interface User {
  name: string;
  surname: string;
  email: string;
  id: number;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  filteredUsers: Observable<User[]> | any;
  employees = new FormControl('');

  constructor(private http: HttpClient, private dialog:MatDialog, private roleService:RoleService) {
  }

  ngOnInit() {
    this.http.get<any>(`${environment.link}/api/user/getUsers`)
      .subscribe(Users => {
        for (let response of Users) {
          if(response.email !== "client@ncdc.pl" && response.email !== this.roleService.getMyEmail()) {
            this.users.push({name: response.name, surname: response.surname, email: response.email, id: response.id});
          }
        }
        this.filteredUsers = this.employees.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value || '')),
        );
      });
  }


  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.users.filter(
      (option: { name: string; surname: string; }) => (option.name.toLowerCase() + " " + option.surname.toLowerCase()).includes(filterValue));
  }

  openDialog(name:string, surname:string, email:string, id:number){
    this.dialog.open(UserDialogComponent, {
      width: '300px',
      data :{
        'name':name,
        'surname':surname,
        'email':email,
        'id': id
      }
    });
  }
}

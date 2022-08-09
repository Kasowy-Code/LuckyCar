import {Component, Inject, OnInit} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

interface User {
  userName: string;
  userSurname: string;
  userId: number;
  completed: false;
}

@Component({
  selector: 'app-reserve-admin-button-dialog',
  templateUrl: './reserve-admin-button-dialog.component.html',
  styleUrls: ['./reserve-admin-button-dialog.component.css']
})
export class ReserveAdminButtonDialogComponent implements OnInit {

  users: User[] = [];
  list: User[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.http.post<any>(`${environment.link}/api/reservation/update-settings`,
      this.data)
      .subscribe(Users => {
        console.log(Users);
        let i :number = -1;
        for (let response of Users) {
          console.log(response);
          if(response != null) {
            this.users.push({
              userName: response.userName,
              userSurname: response.userSurname,
              userId: response.userId,
              completed: false
            });
          } else {
            this.users.push({
              userName: "Free",
              userSurname: "space",
              userId: --i,
              completed: false
            })
          }
        }
      });
  }

  reserve(){
    for(let user of this.users){
      if(user.completed){
        this.list.push(user);
      }
    }
    this.list.forEach(u =>{
      console.log(u.userId)
    });
  }
}

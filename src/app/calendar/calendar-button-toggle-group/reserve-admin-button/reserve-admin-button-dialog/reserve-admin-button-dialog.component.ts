import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  request: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,
              private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.http.post<any>(`${environment.link}/api/reservation/update-settings`,
      this.data)
      .subscribe(Users => {
        console.log(Users);
        let i: number = -1;
        for (let response of Users) {
          console.log(response);
          if (response != null) {
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

  reserve() {
    for (let user of this.users) {
      if (user.completed) {
        this.list.push(user);
      }
    }
    this.list.forEach(u => {
      const start = new Date(this.data.startDate);

        let req = {};
        if (u.userId < 0) {
          req = {
            "userId": null,
            "date": start.toISOString().substring(0, 16)
          }
        } else {
          req = {
            "userId": u.userId,
            "date": start.toISOString().substring(0, 16)
          }
        }

        this.request.push(req);

    });
    return this.http.patch(`${environment.link}/api/reserve`, this.request).subscribe(() => {
      this.snackBar.open("The booking was successful", "", {
        duration: 5*1000,
        panelClass: ['good-snackbar'],
        horizontalPosition: "end",
        verticalPosition: "top",
      });
    });
  }
}


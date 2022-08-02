import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient, private snackBar:MatSnackBar) { }

  changePassword(){
    return this.http.get(`${environment.link}/api/restartPassword`, {responseType: 'text' as 'json'})
      .pipe(tap(data =>{
        this.snackBar.open("Success! Check your email", "", {
          duration: 5*1000,
          panelClass: ['good-snackbar'],
          horizontalPosition: "end",
          verticalPosition: "top",
        });
      }));

  }
}


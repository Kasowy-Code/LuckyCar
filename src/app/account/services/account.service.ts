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

  deleteAccount(){
    return this.http.delete(`${environment.link}/api/user/delete`, {responseType: 'text' as 'json'})
      .pipe(tap(data=>{
        this.snackBar.open("Your account has been deleted", "", {
          duration: 5*1000,
          panelClass: ['good-snackbar'],
          horizontalPosition: "end",
          verticalPosition: "top",
        });
      }));
  }

  setAdmin(id:any){
    const request = {
      "id": id
    }
    return this.http.patch(`${environment.link}/api/user/setAdmin`, request, {responseType: 'text' as 'json'})
      .pipe(tap(data => {
        this.snackBar.open("Admin role given", "", {
          duration: 5*1000,
          panelClass: ['good-snackbar'],
          horizontalPosition: "end",
          verticalPosition: "top",
        });
      }))
  }

  deleteAccountById(id:any){
    const request = {
      "id": id
    }
    return this.http.delete(`${environment.link}/api/user/delete-by-id`,  {responseType: 'text' as 'json',
      body: request}).pipe(tap(data => {
      this.snackBar.open("This account has been deleted", "", {
        duration: 5*1000,
        panelClass: ['good-snackbar'],
        horizontalPosition: "end",
        verticalPosition: "top",
      });
    }))
  }
}


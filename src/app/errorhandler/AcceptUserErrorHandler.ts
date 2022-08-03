import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {LogoutService} from "../Auth/services/logout.service";
import {AcceptUserComponent} from "../Auth/accept-user/accept-user.component";

@Injectable({
  providedIn: 'root'
})
export class AcceptUserErrorHandler implements ErrorHandler {

  constructor(private _snackBar: MatSnackBar, private logoutService:LogoutService) {
  }

  openSnackBar(message:string){
    this._snackBar.open(message, "", {
      duration: 5*1000,
      panelClass: ['error-snackbar'],
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  handleError(error:any) {

    error.

    // if(error.status === 400){
    //   this.openSnackBar("This user does not exist!");
    // }
    //
    // if(error.status === 404){
    //   this.openSnackBar("This user was approved earlier");
    // }
    //
    // if(error.status === 401){
    //   this.logoutService.logout();
    // }
  }
}

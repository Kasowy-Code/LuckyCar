import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthErrorHandler implements ErrorHandler {

  constructor(private _snackBar: MatSnackBar) {
  }

  handleError(error:any) {
    if(error.status === 400){
        this._snackBar.open("This user does not exist!", "", {
          duration: 5*1000,
          panelClass: ['error-snackbar'],
          horizontalPosition: "end",
          verticalPosition: "top",
        });
    }

    if(error.status === 409){
      this._snackBar.open("Password cannot be set for this user!", "", {
        duration: 5*1000,
        panelClass: ['error-snackbar'],
        horizontalPosition: "end",
        verticalPosition: "top",
      });
    }
  }
}

import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SetPasswordErrorHandler implements ErrorHandler {

  constructor(private _snackBar: MatSnackBar, private router:Router) {
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
    if(error.status === 400){
       this.openSnackBar("This user does not exist!");
    }

    if(error.status === 409){
      this.openSnackBar("Password cannot be set for this user!");
    }

    if(error.status === 404){
      this.openSnackBar("This user does not exist!");
    }
  }
}

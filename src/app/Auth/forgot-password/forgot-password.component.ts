import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ForgotPasswordService} from "./services/forgot-password.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  error: boolean = false;
  username:string = '';
  loading = false;

  constructor(private route:ActivatedRoute,
              private forgotService:ForgotPasswordService,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  getErrorMessage(item: any) {
    if (item.hasError('email')) {
      return 'Not a valid email';
    }
    return item.hasError('required') ? 'You must enter a value' : '';
  }
  //TODO login navigation button, success snackbar email send
  // LOADING BUTTON
  forgotPassword(){
    this.loading = true;
    this.forgotService.forgotPassword(this.username.toLowerCase()).subscribe(()=> {
      this.snackBar.open("Link was sent to your email address!", "", {
        duration: 5*1000,
        panelClass: ['good-snackbar'],
        horizontalPosition: "end",
        verticalPosition: "top",
      });
      this.loading = false;
    }, () =>{
      this.error = true;
      this.loading = false;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RestartPasswordService} from "./services/restart-password.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrls: ['./restart-password.component.css']
})
export class RestartPasswordComponent implements OnInit {

  pass = new FormControl('', [Validators.minLength(8), Validators.required]);
  repeat_password = new FormControl('', [Validators.minLength(8), Validators.required]);

  error = false;
  passwordError: boolean = false;
  password:string = "";
  id = this.route.snapshot.params['id'];
  hide1: boolean = true;
  hide2: boolean = true;

  constructor(private route:ActivatedRoute, private restartService:RestartPasswordService,
              private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  clearErrors() {
    this.passwordError = false;
    this.error = false;
  }

  getErrorMessage(item: any) {
    if(item.hasError('minlength')) {
      return 'Must be at least 8 characters long';
    }
    return item.hasError('required') ? 'You must enter a value' : '';
  }

  setNewPassword(){
    if (this.pass.value === this.repeat_password.value && this.password.length >= 8) {
      this.restartService.setNewPassword(this.id, this.password)
        .subscribe(() => {
            this.router.navigate(["/login"]);
            this.snackBar.open("Success! Your password has been changed", "", {
              duration: 5*1000,
              panelClass: ['good-snackbar'],
              horizontalPosition: "end",
              verticalPosition: "top",
            });
          },
          ()=> {
            this.error = true;
          });
    }
    else {
      this.passwordError = true;
    }
  }
}

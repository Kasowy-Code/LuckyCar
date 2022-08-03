import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RegisterService} from "../services/register.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    NameSurnamePattern = /^[A-Z|[ĄĘŁĆŻŹŃŚÓ]{1}[a-z|[ąęłćźżńśó]{1,38}$/;
    name = new FormControl('', [Validators.minLength(2), Validators.required, Validators.pattern(this.NameSurnamePattern)]); //TODO: minimum field length = 2
    surname = new FormControl('', [Validators.minLength(2), Validators.required, Validators.pattern(this.NameSurnamePattern)]); //TODO: minimum field length = 2
    email = new FormControl('', [Validators.email, Validators.required]);
    error = false;
    loading = false;
  constructor(private http: HttpClient, private router: Router,
              private registerService: RegisterService,
              private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
  }

  getErrorMessage(item: any) {
      // this.error = true;
    if(item.hasError('email')) {
      return 'Not a valid email';
    }
    if(item.hasError('minlength')) {
      return 'Must be at least 2 characters long';
    }
    if(item.hasError('pattern')) {
      return 'Invalid format';
    }
    return item.hasError('required') ? 'You must enter a value' : '';

  }

  register() {
    this.loading = true;
      this.registerService.register(String(this.name.value), String(this.surname.value), String(this.email.value))
        .subscribe(() => {
          this.router.navigate(["/registered"]);
        }, err => {
          if(err.status === 409){
            this.snackBar.open("This user already exists", "", {
              duration: 5*1000,
              panelClass: ['error-snackbar'],
              horizontalPosition: "end",
              verticalPosition: "top",
            });
          }

            this.loading = false;
            this.error = true;
        });
  }
}

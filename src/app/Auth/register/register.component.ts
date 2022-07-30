import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RegisterService} from "../services/register.service";

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
    error = true;
  loading = false;
  constructor(private http: HttpClient, private router: Router, private registerService: RegisterService) {
  }

  ngOnInit(): void {
  }

  getErrorMessage(item: any) {
      this.error = true;
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
    if (!this.error) {
      this.registerService.register(String(this.name.value), String(this.surname.value), String(this.email.value))
        .subscribe(() => {
          this.router.navigate(["/registered"]);
        }, err => {
            this.loading = false;
        });
    }
  }
}


  //TODO: MACIEJU ZROB WALIDACJE
  // onSubmit() {
  //   if (!this.RegisterForm.value.email?.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) {
  //       this.emailError = true;
  //   }
  //   if(!this.RegisterForm.value.name?.match(/^[A-Z|[ĄĘŁĆŻŹŃŚ]{1}[a-z|[ąęłćźżńś]{1,38}$/)) {
  //     this.nameError = true;
  //   }
  //   if(!this.RegisterForm.value.surname?.match(/^[A-Z|[ĄĘŁĆŻŹŃŚ]{1}[a-z|[ąęłćźżńś]{1,38}$/)) {
  //     this.surnameError = true;
  //   }
  //   if(!this.emailError && !this.nameError && !this.surnameError) {
  //     this.http.post(`${environment.link}/api/register`, this.RegisterForm.value, {observe: "response"})
  //       .subscribe(response => {
  //           this.error = true;
  //           this.router.navigate(["/Registered"]);
  //
  //         },
  //         error => {
  //           this.error = true;
  //         });
  //   }
  // }


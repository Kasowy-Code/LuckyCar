import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  LoginForm = new FormGroup({
    name: new FormControl(''), //TODO: minimum field length = 2
    surname: new FormControl(''), //TODO: minimum field length = 2
    email: new FormControl('')
  });
  emailError: boolean = false;
  error: boolean = false;
  nameError: boolean = false;
  surnameError: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.LoginForm.value.email?.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) {
        this.emailError = true;
    }
    if(!this.LoginForm.value.name?.match(/^[A-Z|[ĄĘŁĆŻŹŃŚ]{1}[a-z|[ąęłćźżńś]{1,38}$/)) {
      this.nameError = true;
    }
    if(!this.LoginForm.value.surname?.match(/^[A-Z|[ĄĘŁĆŻŹŃŚ]{1}[a-z|[ąęłćźżńś]{1,38}$/)) {
      this.surnameError = true;
    }
    if(!this.emailError && !this.nameError && !this.surnameError) {
      this.http.post(`${environment.link}/api/register`, this.LoginForm.value, {observe: "response"})
        .subscribe(response => {
            this.error = true;
            this.router.navigate(["/Registered"]);

          },
          error => {
            console.log(error);
          });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.css']
})
export class RegisterPasswordComponent implements OnInit {
  LoginForm = new FormGroup({
    password: new FormControl(''),
    repeat_password: new FormControl('')

  });
  passwordError: boolean = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.LoginForm.value.repeat_password != this.LoginForm.value.password) {
      this.passwordError = true;
    } else {
      let Pass = {
        password: this.LoginForm.value.password
      }
      console.log(Pass);
      // this.http.post(`${environment.link}/register`, this.LoginForm.value.password, {observe: "response"})
      //   .subscribe(response => {
      //
      //   });
    }
  }
}

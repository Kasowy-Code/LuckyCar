import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
    login: new FormControl(''),
    pass: new FormControl(''),
  });
  error: boolean = false;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

    console.warn(this.LoginForm.value);
    this.http.post('api/Login', this.LoginForm.value, {observe: "response"})
      .subscribe(response => {
        if(response.status != 200) {
            this.error = true;
          }
      });
  }
}

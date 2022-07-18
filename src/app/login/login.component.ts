import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.LoginForm.value);
  }
}

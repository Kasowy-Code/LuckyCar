import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  hide = true;
  username:string = "";
  password:string = "";
  error: boolean = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required, Validators.minLength(8)]);


  constructor(private loginService:LoginService, private router:Router) {
  }

  ngOnInit():void {
  }

  getErrorMessage(item: any) {
    if(item.hasError('email')) {
      return 'Not a valid email';
    }
    if(item.hasError('minlength')) {
      return 'Must be at least 8 characters long';
    }
    return item.hasError('required') ? 'You must enter a value' : '';

  }

  public getAccessToken(){
    this.loginService.loginUser(this.username, this.password)
      .subscribe(() => {
        this.router.navigate(["/calendar"]);
      },
      error => {
        this.error = true;
      });
  }
}



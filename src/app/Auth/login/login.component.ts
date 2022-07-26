import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {LoginService} from "./services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  hide = true;
  username:string = "";
  password:string = "";

  constructor(private loginService:LoginService, private router:Router) {
  }


  ngOnInit():void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public getAccessToken(){
    this.loginService.loginUser(this.username, this.password)
      .subscribe(() => {
        this.router.navigate(["/calendar"]);
      },
      error => {
          //TODO: FUNKCJA WYPISZE INVALID USERNAME/PASSWORD NA FRONCIE
      });
  }

}



import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {RestApiService} from "../../rest-api.service";
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

  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required, Validators.minLength(8)]);

  error: boolean = false;


  constructor(private service:RestApiService, private router:Router) {
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
    let resp = this.service.generateToken(this.username, this.password);
    resp.subscribe(data => {
        localStorage.setItem('token', data.toLocaleString());
        this.router.navigate(["/calendar"]);
      },
      error => {
        this.error = true;
      });
  }

}



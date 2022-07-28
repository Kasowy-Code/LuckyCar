import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {RegisterService} from "../services/register.service";

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.css']
})
export class RegisterPasswordComponent implements OnInit {

  pass = new FormControl('', [Validators.minLength(8), Validators.required]);
  repeat_password = new FormControl('', [Validators.minLength(8), Validators.required]);

  error = false;
  passwordError: boolean = false;
  password:string = "";
  id = this.route.snapshot.params['id'];

  constructor(private http: HttpClient, private router: Router, private registerService:RegisterService, private route:ActivatedRoute) { }

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
  //TODO MACIEK WES SPRAWDZ CZY HASLA SA IDENTYCZNE :)
  // JAK NIE TO WYSWIETL TO err => "cos"
  setPassword() {
    if (this.pass.value === this.repeat_password.value && this.password.length >= 8) {
      this.registerService.setPassword(this.password, this.id)
        .subscribe(() => {
          this.router.navigate(["/login"]);
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

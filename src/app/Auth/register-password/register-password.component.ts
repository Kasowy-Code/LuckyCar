import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {RegisterService} from "../services/register.service";

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.css']
})
export class RegisterPasswordComponent implements OnInit {
  RegisterForm = new FormGroup({
    password: new FormControl(''),
    repeat_password: new FormControl('')

  });
  error = false;
  passwordError: boolean = false;
  password:string = "";
  id = this.route.snapshot.params['id'];

  constructor(private http: HttpClient, private router: Router, private registerService:RegisterService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  //TODO MACIEK WES SPRAWDZ CZY HASLA SA IDENTYCZNE :)
  // JAK NIE TO WYSWIETL TO err => "cos"

  setPassword(){
      this.registerService.setPassword(this.password, this.id)
        .subscribe(()=>{
            this.router.navigate(["/login"]);
        });
  }
}

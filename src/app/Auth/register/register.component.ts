import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RegisterService} from "../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm = new FormGroup({
    name: new FormControl(''), //TODO: minimum field length = 2
    surname: new FormControl(''), //TODO: minimum field length = 2
    email: new FormControl('')
  });
  emailError: boolean = false;
  error: boolean = false;
  nameError: boolean = false;
  surnameError: boolean = false;
  name: string = "";
  surname: string = "";
  email: string = "";
  loading = false;

  constructor(private http: HttpClient, private router: Router, private registerService: RegisterService) {
  }

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    this.registerService.register(this.name, this.surname, this.email)
      .subscribe(() => {
        this.router.navigate(["/registered"]);
      }, err => {
        this.loading = false;
        //TODO: MACIEK ZROB ZE WYSWITLI BLEDY ONE PRZYJDA Z BACKEDNU W ARRAYLISCIE
      });
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


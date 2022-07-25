import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {APIServiceService} from "../../api-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  username: string|undefined|null= this.LoginForm.value.username;
  password: string|undefined|null= this.LoginForm.value.password;
  error: boolean = false;
  constructor(private http: HttpClient, private router: Router, private service: APIServiceService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let response = this.service.Login(this.username, this.password)
      response.subscribe(data => {
        this.router.navigate(["/Calendar"]);
      },
      error => {
          this.error = true;
      }
      );
  }
}

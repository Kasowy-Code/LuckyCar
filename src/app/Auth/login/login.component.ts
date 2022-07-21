import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

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
  error: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.http.post(`${environment.link}/login`, this.LoginForm.value, {observe: "response"})
      .subscribe(response => {
        this.router.navigate(["/Calendar"]);
      },
      error => {
          this.error = true;
      }
      );
  }
}

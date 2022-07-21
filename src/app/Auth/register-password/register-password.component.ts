import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

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
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.RegisterForm.value.repeat_password != this.RegisterForm.value.password) {
      this.passwordError = true;
    } else {
      let Pass = {
        password: this.RegisterForm.value.password
      }
      let id = this.route.snapshot.params['id'];
      this.http.post(`${environment.link}/register/`+id, this.RegisterForm.value.password, {observe: "response"})
        .subscribe(response => {

        },
       error => {
        this.error = true;
      });
    }
  }
}

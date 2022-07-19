import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  LoginForm = new FormGroup({
    name: new FormControl(''), //TODO: minimum field length = 2
    surname: new FormControl(''), //TODO: minimum field length = 2
    password: new FormControl(''),
    email: new FormControl('')
  });

  error: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.http.post('localhost:8080/register', this.LoginForm.value, {observe: "response"})
      .subscribe(response => {
        if(response.status != 200) {
          this.error = true;
          this.router.navigate(["/Registered"]);
        }
      });
  }
}

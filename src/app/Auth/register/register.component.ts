import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  LoginForm = new FormGroup({
    login: new FormControl(''),
    pass: new FormControl(''),
    email: new FormControl('')
  });
  error: boolean = false;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

    console.warn(this.LoginForm.value);
    this.http.post('api/register', this.LoginForm.value, {observe: "response"})
      .subscribe(response => {
        if(response.status != 200) {
          this.error = true;
        }
      });
  }
}

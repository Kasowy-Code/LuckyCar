import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http:HttpClient) { }

  forgotPassword(email:string){
    const request = {
      "email": email
    }
    return this.http.post(`${environment.link}/api/restartPassword/forgot`, request,
      {responseType: 'text' as 'json'});
  }
}

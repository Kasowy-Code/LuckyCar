import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {catchError, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {AuthErrorHandler} from "../../errorhandler/AuthErrorHandler";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient, private route:ActivatedRoute, private errorHandler:AuthErrorHandler) { }

  register(name:string, surname:string, email:string) {
    const request={
      "name": name,
      "surname": surname,
      "email": email
    };

      return this.http.post(`${environment.link}/api/register`, request, {responseType: 'text' as 'json'});
  }

  setPassword(password:string, id:any){
    const request = {
      "password": password
    };

    return this.http.post(`${environment.link}/api/register/`+id, request, {responseType: 'text' as 'json'})
      .pipe(catchError(error => {
          // this.errorHandler.handleError(error);
        console.log(error);
      }));
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  request:any = {};

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  register(name:string, surname:string, email:string) {
    this.request={
      "name": name,
      "surname": surname,
      "email": email
    };

      return this.http.post(`${environment.link}/api/register`, this.request, {responseType: 'text' as 'json'});
  }

  setPassword(password:string, id:any){
    this.request = {
      "password": password
    };

    return this.http.post(`${environment.link}/api/register/`+id, this.request, {responseType: 'text' as 'json'});
  }
}

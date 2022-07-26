import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  request:any = {};

  constructor(private http: HttpClient) { }

  public generateToken(username:string, password:string){
    this.request={
      "username": username,
      "password": password
    };

    return this.http.post(`${environment.link}/api/authenticate`, this.request,{responseType: 'text' as 'json'});
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  public checkTokenUser(){
    return this.http.get(`${environment.link}/api/isUser`);
  }
  public checkTokenAdmin(){
    return this.http.get(`${environment.link}/api/isAdmin`);
  }
}

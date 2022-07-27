import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs";
import {TokenService} from "../../../shared/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  request:any = {};

  constructor(private http: HttpClient, private tokenService:TokenService) { }

  public loginUser(username:string, password:string){
    this.request={
      "username": username,
      "password": password
    };

    return this.http.post(`${environment.link}/api/authenticate`, this.request,{responseType: 'text' as 'json'})
      .pipe(tap(data =>{
          this.tokenService.setToken(data.toLocaleString());
      }));
  }
}

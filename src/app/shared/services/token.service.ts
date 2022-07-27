import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import {RoleEnum} from "../../role-enum";

interface Token {

  sub: string;
  roles: RoleEnum[];
  exp: number;
  iat: number;

}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(token:string) {
    localStorage.setItem('token', token);
  }

  getDecodedToken():Token {
    // @ts-ignore
    return jwtDecode(this.getToken());
  }
}

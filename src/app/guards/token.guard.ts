import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {TokenService} from "../shared/services/token.service";
import {LogoutService} from "../Auth/services/logout.service";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(private tokenService:TokenService, private logoutService:LogoutService) {
  }

  canActivate(){

    let exp = 0;
    let currentTime = Date.now();
    let ct = currentTime.toString();
    ct = ct.substring(0,10);
    let time:number = +ct;

    try{
      exp = this.tokenService.getDecodedToken().exp;
    }catch{
      this.logoutService.logout();
    }

    if(exp < time || exp - 36000000 > time){
      this.logoutService.logout();
    }

    return true;
  }
}

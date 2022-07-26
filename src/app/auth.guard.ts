import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {RestApiService} from "./rest-api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: RestApiService, private router:Router) {
  }
  canActivate(): boolean{
    if(this.service.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenService:TokenService) {
  }

  intercept(req:any, next:any){
    const token = this.tokenService.getToken();

    if(token) {
      let cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(cloned);
    }else{
      return next.handle(req);
    }
  }
}

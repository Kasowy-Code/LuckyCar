import { Injectable } from '@angular/core';
import {CanActivate, Router,} from '@angular/router';
import {RoleService} from "../role.service";
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private roleService:RoleService, private router:Router) {
  }

  canActivate(){
    if(this.roleService.isAdmin()){
      return true;
    }else{
      this.router.navigate(["/calendar"]);
      return false;
    }
  }

}

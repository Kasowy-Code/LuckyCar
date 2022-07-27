import { Injectable } from '@angular/core';
import {TokenService} from "./shared/services/token.service";
import {RoleEnum} from "./role-enum";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private tokenService:TokenService) { }

  isAdmin(){
    return this.tokenService.getDecodedToken().roles.some(role => role===RoleEnum.ADMIN);
  }
}

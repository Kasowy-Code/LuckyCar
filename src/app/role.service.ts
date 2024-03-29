import {Injectable} from '@angular/core';
import {TokenService} from "./shared/services/token/token.service";
import {RoleEnum} from "./role-enum";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private tokenService: TokenService) {
  }

  isAdmin() {
    try {
      return this.tokenService.getDecodedToken().roles.some(role => role === RoleEnum.ADMIN);
    } catch {
      return false;
    }
  }

  getMyEmail(){
    try {
      return this.tokenService.getDecodedToken().sub;
    } catch{
      return false;
    }
  }
}

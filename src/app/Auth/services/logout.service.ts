import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../shared/services/token/token.service";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router, private tokenService: TokenService) {
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(["/login"]);
  }
}

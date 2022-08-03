import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenService} from "../shared/services/token/token.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.tokenService.isLoggedIn()) {
      this.router.navigate(['/calendar'])
    }
    return true;
  }
}

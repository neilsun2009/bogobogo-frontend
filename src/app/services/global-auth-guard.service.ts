import { Injectable } from '@angular/core';
import { CanActivateChild, Router,
    ActivatedRouteSnapshot, CanActivate,
    RouterStateSnapshot, Route,
    NavigationExtras } from '@angular/router';
import { GeneralService } from './api/general.service';
import { BgConfigService } from './bg-config.service';
import { EaseOutService } from './ease-out.service';
import { AuthService } from './api/auth.service';

@Injectable()
export class GlobalAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private generalService: GeneralService,
    private router: Router,
    private bgConfigService: BgConfigService,
    private easeOutService: EaseOutService,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // get logged user data
    // console.log(this.authService);
    return this.authService.authAsync().map(
      (data) => {
        // console.log(data);
        if (data.result) {
          this.authService.hasLoggedIn = true;
          this.authService.user = data.data;
        }
        return true;
      });
    // return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // store the url for login/signup redirecting
    const url = state.url;
    if (url !== '/signup' && url !== '/login') {
      this.authService.redirectUrl = state.url;
    }
    return true;
  }

}

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
export class GlobalGeneralGuard implements CanActivate {

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
    return this.generalService.getGeneralAsync().map(
      (data) => {
        // console.log(data);
        if (data.result) {
          this.generalService.generalData = data.data;
        }
        return true;
      }
    );

    // return true;
  }

}

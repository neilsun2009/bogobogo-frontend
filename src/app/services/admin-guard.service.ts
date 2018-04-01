import { Injectable } from '@angular/core';
import { CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, Route,
    NavigationExtras } from '@angular/router';
import { AuthService } from './api/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    const user = this.authService.user;
    // admin logged in
    if (user && user.access === 'administrator') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

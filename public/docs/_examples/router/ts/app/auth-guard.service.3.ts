// #docplaster
// #docregion
import { Injectable }       from '@angular/core';
// #docregion can-activate-child
import {
// #enddocregion can-activate-child
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras,
// #docregion can-activate-child
  CanActivateChild
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }
}

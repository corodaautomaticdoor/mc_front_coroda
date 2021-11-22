import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTE_LOGIN, ROUTE_REGISTER } from '../constant/url.constan';
import { getToken } from '../storage/token.storage';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const authenticate = getToken();
    switch (state.url) {
      case ROUTE_REGISTER:
        if(authenticate){
          this.router.navigate(['/client']);
          return false;
        }
        else
          return true;
      case ROUTE_LOGIN:
        if(authenticate){
          this.router.navigate(['/client']);
          return false;
        }
        else
          return true;
      default:
        if(authenticate)
          this.router.navigate(['/client']);
        else
          this.router.navigate(['/']);
        return false;
    }
  }
}
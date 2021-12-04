import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { getToken } from '../storage/token.storage';

@Injectable()
export class SesionClientGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const authenticate = getToken();
    if (!getToken()) {
        this.router.navigate(['/auth']);
        return false;
    } else {
        var session = JSON.parse(authenticate!);
        if(session.rol == 'Client')
            return true;
        else
            this.router.navigate(['/auth']);
            return false;
    }
  }
}
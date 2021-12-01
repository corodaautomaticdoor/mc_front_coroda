import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRegisterRequestModel } from '../models/register/register.request.model';
import { RegisterModel } from '../models/register/register.model';
import { Router } from '@angular/router';
import { getToken } from '../storage/token.storage';

@Injectable()
export class TokenService{

  isLogging: boolean = getToken() != null;
 
  constructor(
    private router: Router
  ) {}

  isLoggedToRoute(route: string): void {
      localStorage.setItem('temp_route',this.router.url);
      if(!this.isLogging) {
        this.router.navigate(['/auth']);
      } else {
        this.router.navigate([route]);
      }
  }

  isLoggedToMethod(f: () => void): void {
    debugger
    if(!this.isLogging) {
      this.router.navigate(['/auth']);
    } else {
      f();
    }
 }

}
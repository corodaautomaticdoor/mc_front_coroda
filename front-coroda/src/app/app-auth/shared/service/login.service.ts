import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { AUTH_URL } from 'src/app/shared/constants/api.url';
import { ILoginRequestModel } from '../models/login/login.request.model';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login/login.model';
import { map } from 'rxjs/operators';
import { ILoginResponseModel } from '../models/login/login.response.model';

@Injectable()
export class LoginService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  login(login: ILoginRequestModel): Observable<LoginModel> {
    return this.http.post<ILoginResponseModel>(`${AUTH_URL}login`, login).pipe(
      map(resp=>{
        return new LoginModel(resp);
      })
    )
  }

}
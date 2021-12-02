import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { PERSON_URL } from 'src/app/shared/constants/api.url';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRegisterRequestModel } from '../models/register/register.request.model';
import { RegisterModel } from '../models/register/register.model';
import { IRegisterResponseModel } from '../models/register/register.response.model';

@Injectable()
export class RegisterService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  register(register: IRegisterRequestModel): Observable<any> {
    return this.http.post<IRegisterResponseModel>(`${PERSON_URL}`, register).pipe(
      map(resp=>{
        return null;
      })
    )
  }

}
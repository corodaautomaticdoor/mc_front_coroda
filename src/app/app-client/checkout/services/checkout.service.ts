import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { SURVEY_URL } from 'src/app/shared/constants/api.url';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICheckoutRequestModel, ISurvey } from '../model/checkout.request.model';
import { CheckoutModel } from '../model/checkout.model';

@Injectable()
export class CheckoutService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  createSurvey(surveys: ISurvey[]): Observable<any> {
    const request: ICheckoutRequestModel = {
        survey: surveys
    };
    return this.http.post<number>(`${SURVEY_URL}`, request).pipe(
      map(resp=>{
        const result = new CheckoutModel(resp);
        return result;
      })
    )
  }

}
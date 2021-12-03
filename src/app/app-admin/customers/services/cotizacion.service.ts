import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { OPERATION_URL } from 'src/app/shared/constants/api.url';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICotizacionResponseModel } from '../models/cotizacion.response.model';

@Injectable()
export class CotizacionService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getCotizaciones(): Observable<ICotizacionResponseModel> {
    return this.http.get<ICotizacionResponseModel>(`${OPERATION_URL}`).pipe(
      map(resp=>{
        return resp;
      })
    )
  }

  updateCotizacion(request: any): Observable<any> {
    return this.http.put<ICotizacionResponseModel>(`${OPERATION_URL}update-operation/` + request.operationId,request).pipe(
      map(resp=>{
        return resp;
      })
    )
  }
}
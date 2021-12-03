import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import {PRODUCTO_URL } from 'src/app/shared/constants/api.url';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  createProduct(request: any): Observable<any> {
    return this.http.post<any>(`${PRODUCTO_URL}`, request).pipe(
      map(resp=>{
        return resp;
      })
    )
  }

  getProduct(): Observable<any> {
    return this.http.get<any>(`${PRODUCTO_URL}`).pipe(
      map(resp=>{
        return resp;
      })
    )
  }
}
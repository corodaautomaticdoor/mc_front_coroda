import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { OPERATION_URL, PRODUCTO_URL } from 'src/app/shared/constants/api.url';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem, MenuItemImage } from 'src/app/app.models';
import { IDetailProduct, IOperationRequestModel } from '../model/operation.request.model';
import { OperationModel } from '../model/operation.model';
import { IOperationResponseModel } from '../model/operation.response.model';

@Injectable()
export class CartService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  cotizar(items: MenuItem[]): Observable<OperationModel> {
    const ls: any = JSON.parse(localStorage.getItem("OAuthToken")!);
    const numberDocument: string = ls.numberDocument;
    let detailProducts: IDetailProduct[] = [];
    items.forEach(s => {
        const detailProduct: IDetailProduct = {
            model: s.modelo,
            quantity: s.cartCount,
            newStyleProduct: [
                {
                    color: s.nuevoColor!,
                    dimention: s.nuevasDescripciones!
                }
            ]
        };
        detailProducts.push(detailProduct);
    });
    const request: IOperationRequestModel = {
        typeOperation: 0,
        numberDocument: numberDocument,
        detail: detailProducts
    };
    return this.http.post<number>(`${OPERATION_URL}`, request).pipe(
      map(resp=>{
        const result = new OperationModel(resp);
        return result;
      })
    )
  }

}
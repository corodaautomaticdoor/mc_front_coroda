import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { PRODUCTO_URL } from 'src/app/shared/constants/api.url';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICartResponseModel } from '../model/cart.response.model';
import { CartModel } from '../model/cart.model';
import { PaginatorModel } from '../model/paginator.model';
import { ProductoPaginatorModel } from '../model/producto.paginator.model';
import { ProductoRequestModel } from '../model/producto..request.model';
import { MenuItem, MenuItemImage } from 'src/app/app.models';

@Injectable()
export class HomeService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getSpecialItems(): Observable<CartModel> {
    return this.http.post<ICartResponseModel>(`${PRODUCTO_URL}specialCarts`,null).pipe(
      map(resp=>{
        return new CartModel(resp);
      })
    )
  }

  getProductos(): Observable<MenuItem[]> {
    const headers = new Headers();
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post<ProductoPaginatorModel[]>(`${PRODUCTO_URL}`, {headers}).pipe(
      map(resp=>{
        let productoItems: MenuItem[] = [];
        resp.forEach(s=>{
          let image = new MenuItemImage(s.image,s.image,s.image);
          let producto = new MenuItem(s.id,s.brand,s.description,s.priceUnit, image, 0,0,0,0,s.category,s.subCategory,s.model,s.material,s.dimensions,s.color,0,0,false,0,'','');
          productoItems.push(producto);
        });
        return productoItems;
      })
    )
  }

}
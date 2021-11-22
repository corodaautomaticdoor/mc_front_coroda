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
import { CategoriaEnum } from '../model/cateogria.enum';

@Injectable()
export class MenuService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getProductos(): Observable<MenuItem[]> {
    return this.http.post<ProductoPaginatorModel[]>(`${PRODUCTO_URL}`,null).pipe(
      map(resp=>{
        let productoItems: MenuItem[] = [];
        resp.forEach(s=>{
          let categoryId = 0;
          switch (s.category) {
            case CategoriaEnum.puerta:
              categoryId = 1;
              break;
            case CategoriaEnum.controles:
              categoryId = 2;
              break;  
            case CategoriaEnum.motores:
              categoryId = 3;
              break;
            default:
              categoryId = 0;
              break;
          }
          let image = new MenuItemImage(s.image,s.image,s.image);
          let producto = new MenuItem(s.id,s.brand,s.description,s.priceUnit, image, 0,0,0,0,s.category,s.subCategory,s.model,s.material,s.dimensions,s.color,0,0,false,categoryId);
          productoItems.push(producto);
          console.log(producto)
        });
        return productoItems;
      })
    )
  }

}
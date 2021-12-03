import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { CouponsComponent } from './coupons.component';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';
import { ProductService } from './services/product.service';

export const routes = [
  { path: '', component: CouponsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CouponsComponent, 
    CouponDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    ProductService
  ]
})
export class CouponsModule { }

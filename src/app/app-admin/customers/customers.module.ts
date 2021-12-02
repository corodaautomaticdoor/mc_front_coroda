import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import { CustomersComponent } from './customers.component';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { CotizacionService } from './services/cotizacion.service';
import { CotizacionUpdateComponent } from './cotizacion-update/cotizacion-update.component';

export const routes = [
  { path: '', component: CustomersComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerDialogComponent,
    CotizacionUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule 
  ],
  providers: [CotizacionService]
})
export class CustomersModule { }

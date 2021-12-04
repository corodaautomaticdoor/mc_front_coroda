import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutService } from './services/checkout.service';
import { ModalSendComponent } from './modal-send/modal-send.component';

export const routes = [
  { path: '', component: CheckoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    CheckoutComponent,
    ModalSendComponent
  ],
  providers: [CheckoutService]
})
export class CheckoutModule { }

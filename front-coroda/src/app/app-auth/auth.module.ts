import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'; 
import { AuthRoutingModule } from './auth.routing.module';
import { AuthComponent } from './auth.component';
import { LoginService } from './shared/service/login.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { RegisterService } from './shared/service/register.service';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    LoginService,
    RegisterService,
    AuthGuard
  ]
})
export class AuthModule { }

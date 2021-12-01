import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'; 
import { AuthComponent } from './auth.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  { 
    path: '', 
    component: AuthComponent, children: [
        { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [AuthGuard] },
        { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule), canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
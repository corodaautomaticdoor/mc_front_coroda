import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'; 
import { SesionAdminGuard } from './app-auth/shared/guard/sesion.admin.guard';
import { SesionClientGuard } from './app-auth/shared/guard/sesion.client.guard';
import { AppClientComponent } from './app-client/app-client.component';
import { NotFoundComponent } from './app-client/not-found/not-found.component';

const routes: Routes = [
  { 
    path: '', 
    component: AppClientComponent, children: [
        { path: '', loadChildren: () => import('./app-client/app-home/app-home.module').then(m => m.AppHomeModule) },
        { path: 'customers', loadChildren: () => import('./app-client/app-home/app-home.module').then(m => m.AppHomeModule) },
        { path: 'about', loadChildren: () => import('./app-client/about/about.module').then(m => m.AboutModule) },
        { path: 'contact', loadChildren: () => import('./app-client/contact/contact.module').then(m => m.ContactModule) },
        { path: 'menu', loadChildren: () => import('./app-client/menu/menu.module').then(m => m.MenuModule) },
        { path: 'chefs', loadChildren: () => import('./app-client/chefs/chefs.module').then(m => m.ChefsModule) },
        { path: 'reservation', loadChildren: () => import('./app-client/reservation/reservation.module').then(m => m.ReservationModule) },
        { path: 'account', loadChildren: () => import('./app-client/account/account.module').then(m => m.AccountModule) },
        { path: 'cart', loadChildren: () => import('./app-client/cart/cart.module').then(m => m.CartModule) },
        { path: 'checkout', loadChildren: () => import('./app-client/checkout/checkout.module').then(m => m.CheckoutModule) },
        { path: 'login', loadChildren: () => import('./app-client/login/login.module').then(m => m.LoginModule) },
        { path: 'register', loadChildren: () => import('./app-client/register/register.module').then(m => m.RegisterModule) },
        { path: 'faq', loadChildren: () => import('./app-client/faq/faq.module').then(m => m.FaqModule) },
        { path: 'terms-conditions', loadChildren: () => import('./app-client/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },
    ]
  },
  { path: 'auth', loadChildren: () => import('./app-auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./app-admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: NotFoundComponent } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      initialNavigation: 'enabled', // for one load page, without reload
      relativeLinkResolution: 'legacy'
      // useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
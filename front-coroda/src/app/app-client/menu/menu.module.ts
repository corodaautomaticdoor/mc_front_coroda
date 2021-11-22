import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MenuComponent } from './menu.component';
import { MenuSingleComponent } from './menu-single/menu-single.component';
import { MenuService } from './services/home.service';
import { HomeService } from '../app-home/services/home.service';

export const routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' },
  { path: ':id', component: MenuSingleComponent }
];

@NgModule({
  declarations: [
    MenuComponent, 
    MenuSingleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule
  ],
  providers: [
    MenuService,
    HomeService
  ]
})
export class MenuModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AppHomeComponent } from './app-home.component';
import { HomeService } from './services/home.service';

export const routes = [
  { path: '', component: AppHomeComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [AppHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [HomeService]
})
export class AppHomeModule { }

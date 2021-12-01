import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { getToken, removeToken } from 'src/app/app-auth/shared/storage/token.storage';
import { AppService } from 'src/app/app.service'; 
import { CartOverviewComponent } from 'src/app/shared/components/cart-overview/cart-overview.component'; 
import { ReservationDialogComponent } from 'src/app/shared/components/reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-toolbar1',
  templateUrl: './toolbar1.component.html',
  styleUrls: ['./toolbar1.component.scss']
})
export class Toolbar1Component implements OnInit {
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>(); 
  constructor(public appService:AppService, private router: Router) { }

  isLogging: boolean = getToken() != null;

  ngOnInit() { }

  public sidenavToggle(){
    this.onMenuIconClick.emit();
  }
  public openCart(){ 
    this.appService.openCart(CartOverviewComponent)
  }
  public reservation(){ 
    this.appService.makeReservation(ReservationDialogComponent, null, true);   
  }

  logout(){
    removeToken();
    this.router.navigate(['/auth'])
  }
}
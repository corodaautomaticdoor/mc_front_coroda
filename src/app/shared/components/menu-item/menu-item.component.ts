import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/app-auth/shared/service/token.service';
import { getToken } from 'src/app/app-auth/shared/storage/token.storage';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { CartOverviewComponent } from '../cart-overview/cart-overview.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  @Input() lazyLoad: boolean = false;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: any; 
  public column:number = 4;
  isLogging: boolean = getToken() != null;
  constructor(public appService:AppService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){  
    if(changes.viewColChanged){
      this.getColumnCount(changes.viewColChanged.currentValue); 
    }   
  }

  public getColumnCount(value:number){
    if(value == 25){
      this.column = 4;
    }
    else if(value == 33.3){
      this.column = 3;
    }
    else if(value == 50){
      this.column = 2
    }
    else{
      this.column = 1;
    }
  }

  public addToCart(){ 
    if(!this.isLogging) {
      this.router.navigate(['/auth']);
    } else {
      this.appService.addToCart(this.menuItem, CartOverviewComponent); 
    }
  }
  
  public onCart(){
    if(this.appService.Data.cartList.find(item=>item.id == this.menuItem.id && 
                                              ( item.nuevoColor == null || item.nuevoColor == "") &&
                                              ( item.nuevasDescripciones == null || item.nuevasDescripciones == ""))){
      return true;
    }
    return false;
  }

  public onNewStyle(){
    if(this.appService.Data.cartList.find(item=>item.id == this.menuItem.id)){
      return true;
    }
    return false;
  }

  public addToFavorites(){
    this.appService.addToFavorites(this.menuItem);
  }

  public goToCotizacion(){
    debugger
   this.tokenService.isLoggedToRoute('/menu/' + this.menuItem.id);
    // this.appService.addToCart(this.menuItem, CartOverviewComponent); 
    // this.appService.addToCart(this.menuItem, CartOverviewComponent); 
  }

  public onFavorites(){
    if(this.appService.Data.favorites.find(item=>item.id == this.menuItem.id)){
      return true;
    }
    return false;
  }

}

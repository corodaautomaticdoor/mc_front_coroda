import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public total:any[] = []; 
  public cartItemCount:any[] = [];
  public cartItemCountTotal:number = 0; 
  public currentTotalCartCount:number = 0;
  
  constructor(public appService:AppService, public snackBar: MatSnackBar, private router:Router,
              private cartService: CartService) { }

  ngOnInit(): void {  
    this.updateCartTotal(); 
  } 

  ngDoCheck(){ 
    if(this.currentTotalCartCount !== this.appService.Data.totalCartCount){ 
      this.updateCartTotal();
      this.currentTotalCartCount = this.appService.Data.totalCartCount;
    }
  }

  public updateCartTotal(){
    this.cartItemCountTotal = 0;
    this.appService.Data.cartList.forEach(item=>{
      let price = 0;
      if(item.discount){
        price = item.price - (item.price * (item.discount / 100));
      }
      else{
        price = item.price;
      } 
      this.total[item.id] = item.cartCount*price; 
      this.cartItemCount[item.id] = item.cartCount;
      this.cartItemCountTotal += item.cartCount;
    });  
  }

  public onQuantityChange(count:number, menuItem:MenuItem){ 
    menuItem.cartCount = count; 
    let price = 0;
    if(menuItem.discount){
      price = menuItem.price - (menuItem.price * (menuItem.discount / 100));
    }
    else{
      price = menuItem.price;
    } 
    this.total[menuItem.id] = count * price;
    this.cartItemCount[menuItem.id] = count;
    this.appService.calculateCartTotal(); 
    this.cartItemCountTotal = 0;
    this.cartItemCount.forEach(value=>{
      this.cartItemCountTotal +=value;
    });       
    this.appService.Data.totalCartCount = this.cartItemCountTotal;
    this.appService.Data.cartList.forEach(item=>{
      this.cartItemCount.forEach((value,index)=>{
        if(item.id == index){
          item.cartCount = value;
        }
      });
    }); 
  }

  cotizar() {
    this.cartService.cotizar(this.appService.Data.cartList).toPromise().then(s=>{
      this.clear();
      this.router.navigate(['/checkout']);
    });
  }

  public remove(item:MenuItem) {
    const index: number = this.appService.Data.cartList.indexOf(item);
    if (index !== -1) {  
      this.appService.Data.cartList.splice(index, 1); 
      this.appService.calculateCartTotal();       
      this.total.forEach(val => {
        if(val == this.total[item.id]){
          this.total[item.id] = 0;
        }
      }); 
      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[item.id]; 
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val=>{
        if(val == this.cartItemCount[item.id]){
          this.cartItemCount[item.id] = 0;
        }
      }); 
    }     
  }

  public clear(){ 
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  } 
 

}

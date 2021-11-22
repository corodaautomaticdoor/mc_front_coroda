import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';
import { MenuItem } from 'src/app/app.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from '../../app-home/services/home.service';

@Component({
  selector: 'app-menu-single',
  templateUrl: './menu-single.component.html',
  styleUrls: ['./menu-single.component.scss']
})
export class MenuSingleComponent implements OnInit {
  private sub: any;
  public menuItem!: MenuItem; 
  public settings: Settings; 
  public quantityCount:number = 1;
  public relatedMenuItems:Array<MenuItem> = [];
  public buttonEdit: boolean = false;
  public buttonIcon: string = 'edit';
  public buttonToolTip: string = 'Editar';
  public formulario!: FormGroup;

  constructor(public appSettings:AppSettings, 
              public appService:AppService, 
              private activatedRoute: ActivatedRoute,  
              public fb: FormBuilder,
              public snackBar: MatSnackBar,
              public homeService: HomeService ) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() { 
    this.sub = this.activatedRoute.params.subscribe(params => {  
      this.getMenuItemById(params['id']); 
    }); 
    this.getRelatedMenuItems();
    this.formulario = new FormGroup({
      nuevoColor: new FormControl(''),
      nuevaDescripcion: new FormControl('')
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }  

  public getMenuItemById(id:number){
    const index: number = this.appService.Data.cartList.findIndex(item => item.id == id);
    this.homeService.getProductos().subscribe(menuItems => {
      const products: MenuItem[] = menuItems;
      const product = products.filter(s => s.id == id)[0];
      this.menuItem = product;
    });
    // if(index !== -1){
    //   this.menuItem = this.appService.Data.cartList[index];
    //   this.quantityCount = this.menuItem.cartCount;
    // } 
    // else{
    //   this.appService.getMenuItemById(id).subscribe(data=>{ 
    //     this.menuItem = data;  
    //   });
    // } 
    // console.log(this.menuItem);
  }

  public counterChange(count:number){ 
    this.quantityCount = count;   
  } 

  public addToCart(){ 
    this.menuItem.cartCount = this.quantityCount;
    // if(this.menuItem.cartCount <= this.menuItem.availibilityCount){
    const index: number = this.appService.Data.cartList.findIndex(item => item.id == this.menuItem.id); 
    if(this.buttonEdit){
      this.menuItem.nuevoColor = this.formulario.get('nuevoColor')?.value;
      this.menuItem.nuevasDescripciones = this.formulario.get('nuevaDescripcion')?.value;
    } else {
      this.menuItem.nuevoColor = '';
      this.menuItem.nuevasDescripciones = '';
    }
    (index !== -1) ? this.appService.Data.cartList[index] = this.menuItem : this.appService.addToCart(this.menuItem, null); 
    this.appService.calculateCartTotal();
    // }
    // else{
    //   this.menuItem.cartCount = this.menuItem.availibilityCount;
    //   this.snackBar.open('You can not add more items than available. In stock ' + this.menuItem.availibilityCount + ' items and you already added ' + this.menuItem.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    // }
  }


  public addToFavorites(){  
    this.appService.addToFavorites(this.menuItem);
  } 

  public getRelatedMenuItems(){ 
    this.appService.getMenuItems().subscribe(data=>{
      this.relatedMenuItems = this.appService.shuffleArray(data).slice(0, 8); 
    });
  }  

  agregarCaracteristicas(){
    this.buttonEdit = !this.buttonEdit;
    if(this.buttonEdit) {
      this.buttonIcon = 'arrow_back';
      this.buttonToolTip = 'Regresar a original';
    } else {
      this.buttonIcon = 'edit';
      this.buttonToolTip = 'Editar';
    }
  }
}

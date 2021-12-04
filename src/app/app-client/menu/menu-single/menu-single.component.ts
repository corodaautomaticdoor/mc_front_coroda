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
  public formulario: FormGroup= new FormGroup({
    nuevoColor: new FormControl(''),
    nuevaDescripcion: new FormControl('')
  });

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
    const index: number = 
      this.appService.Data.cartList.findIndex(item => item.id == this.menuItem.id && 
                                                      item.nuevasDescripciones == this.formulario.controls['nuevaDescripcion'].value &&
                                                      item.nuevoColor == this.formulario.controls['nuevoColor'].value); 
    if(this.buttonEdit){
    } else {
      this.formulario.controls['nuevoColor'].setValue('');
      this.formulario.controls['nuevaDescripcion'].setValue('');
    }
    if(index !== -1){
      debugger
      this.appService.Data.cartList[index] = this.menuItem;
      this.appService.Data.cartList[index].cartCount = this.quantityCount;
      this.appService.calculateCartTotal();
      this.snackBar.open('Se actualizo el producto "' + this.appService.Data.cartList[index].name + '" en tu cotizacion', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: (this.appSettings.settings.rtl) ? 'rtl':'ltr',
        panelClass: ['success'] 
      });
      // this.appService.openCartView(null);
    } else {
      this.appService.addToCart(this.menuItem, null, this.formulario.controls['nuevoColor'].value, this.formulario.controls['nuevaDescripcion'].value, this.quantityCount);
    }
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

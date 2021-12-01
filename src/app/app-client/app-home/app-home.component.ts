import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';  
import { MenuItem } from 'src/app/app.models';
import { HomeService } from './services/home.service';
import { ProductoPaginatorModel } from './model/producto.paginator.model';
import { ProductoRequestModel } from './model/producto..request.model';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {  
  public slides = []; 
  public specialMenuItems:Array<MenuItem> = [];
  public bestMenuItems:Array<MenuItem> = [];
  public todayMenu!:MenuItem;

  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService,
             public homeService: HomeService ) {
    this.settings = this.appSettings.settings;  
  }

  ngOnInit(): void {
    this.getSlides();
    this.getSpecialMenuItems();
    this.getBestMenuItems();
    this.getTodayMenu();
  }

  public getSlides(){
    this.appService.getHomeCarouselSlides().subscribe((res:any)=>{
      this.slides = res;
    });
  }
 
  public getSpecialMenuItems(){
    const request: ProductoRequestModel = {
      categoriaId: 0,
      page: 0,
      row: 5
    };
    this.homeService.getProductos().subscribe(menuItems => {
      this.specialMenuItems = menuItems;
    });
    // this.appService.getSpecialMenuItems().subscribe(menuItems=>{
    //   this.specialMenuItems = menuItems;
    // });
  } 

  public getBestMenuItems(){
    this.appService.getBestMenuItems().subscribe(menuItems=>{
      this.bestMenuItems = menuItems;
    });
  }

  public getTodayMenu(){
    this.appService.getMenuItemById(23).subscribe(data=>{ 
      this.todayMenu = data;  
    });
  }  

}

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';
import { coupons } from './coupons';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CouponsComponent implements OnInit {
  displayedColumns: string[] = ['category', 'subCategory', 'model', 'origin', 'material', 'dimensions', 'color', 'priceUnit'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ]
  public discountTypes = [
    { id: 1, name: 'Percentage discount' },
    { id: 2, name: 'Fixed Cart Discount' },
    { id: 3, name: 'Fixed Product Discount' }
  ];

  constructor(public appService:AppService, public snackBar: MatSnackBar, private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
    this.productService.getProduct().subscribe(s=> {
      this.initDataSource(s.reverse());  
    });
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
    (this.dataSource.sortingDataAccessor as any) = (data:any, sortHeaderId: string ) => {
      return this.getPropertyByPath(data, sortHeaderId.toString());
    };
  }  

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o:any, i:any) => o[i], obj);
  }

  public getCategories(){
    if(!this.appService.Data.categories.length){
      this.appService.getCategories().subscribe(categories=>{ 
        this.appService.Data.categories = categories;
      });
    } 
  } 

  public remove(coupon:any) {
    const index: number = this.dataSource.data.indexOf(coupon);    
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
			let dialogRef = this.appService.openConfirmDialog('', message!);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){ 
          this.dataSource.data.splice(index,1);
          this.initDataSource(this.dataSource.data); 
				}
			});  
    } 
  }  

  public openproductDialog(coupon:any){
    let data = {
      coupon: coupon,
      stores: this.stores,
      discountTypes: this.discountTypes,
      categories: this.appService.Data.categories
    };
    const dialogRef = this.appService.openDialog(CouponDialogComponent, data, 'theme-dialog');
    dialogRef.afterClosed().subscribe(coup => {  
      this.ngOnInit();
    });  
  }

}

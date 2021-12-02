import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { CotizacionUpdateComponent } from './cotizacion-update/cotizacion-update.component';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { customers } from './customers';
import { CotizacionService } from './services/cotizacion.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['typeOperation', 'numberDocument', 'name', 'phone', 'totalAmount', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ]
  public countries:any[] = [];

  constructor(public appService:AppService, public snackBar: MatSnackBar, private cotizacionService: CotizacionService) { }

  ngOnInit(): void { 
    this.countries = this.appService.getCountries();
    this.cotizacionService.getCotizaciones().subscribe(s=>{
      this.initDataSource(s); 
    });
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  } 

  public remove(customer:any) {
    const index: number = this.dataSource.data.indexOf(customer);    
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

  public openCustomerDialog(customer:any){
    let data = {
      customer: customer,
      stores: this.stores,
      countries: this.countries
    };
    const dialogRef = this.appService.openDialog(CustomerDialogComponent, data, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cus => {  
      if(cus){
        let message = '';      
        const index: number = this.dataSource.data.findIndex(x => x.id == cus.id); 
        if(index !== -1){
          this.dataSource.data[index] = cus;
          message = 'Customer '+cus.firstName+ ' ' +cus.lastName+' updated successfully';
        } 
        else{ 
          let last_customer = this.dataSource.data[this.dataSource.data.length - 1]; 
          cus.id = last_customer.id + 1; 
          this.dataSource.data.push(cus); 
          this.paginator.lastPage();
          message = 'New customer '+cus.firstName+ ' ' +cus.lastName+' added successfully!'; 
        }  
        this.initDataSource(this.dataSource.data); 
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });          
      }
    });  
  }

  public openUpdateCotizacion(customer:any){
    console.log(customer)
    let data = {
      customer: customer,
      stores: this.stores,
      countries: this.countries
    };
    const dialogRef = this.appService.openDialog(CotizacionUpdateComponent, data, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cus => {  
     
    });  
  }
}

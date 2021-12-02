import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Detail } from '../models/cotizacion.response.model';
import { CotizacionService } from '../services/cotizacion.service';

@Component({
  selector: 'app-cotizacion-update',
  templateUrl: './cotizacion-update.component.html',
  styleUrls: ['./cotizacion-update.component.scss'],
  providers: [CotizacionService]
})
export class CotizacionUpdateComponent implements OnInit {
  public form!: FormGroup;
  public listDetail: Detail[] = [];
  constructor(public dialogRef: MatDialogRef<CotizacionUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      cotizacion: new FormControl(this.data.customer.totalAmount, [Validators.required])
    });
    this.listDetail= this.data.customer.detail;
    this.listDetail.forEach(s=>{
      if(s.newStyleProduct.length > 0) {
        s.newStyleProductDescription = s.newStyleProduct[0].color + ' - ' + s.newStyleProduct[0].dimention;
      } else {
        s.newStyleProductDescription = '-';
      }
    });
  }

  public onSubmit(){
    let nuevaLista = [];
    const list: any = document.getElementsByTagName('form')[1].querySelectorAll('input:enabled');
    let details: Detail[] = this.data.customer.detail;
    for(let i = 0; i < details.length; i++) {
      const value = {
        detailId: details[i].detailId,
        operationId: details[i].operationId,
        model: details[i].model,
        newStyleProduct: details[i].newStyleProduct,
        quantity: details[i].quantity,
        priceUnit: list[i].value,
      };
      nuevaLista.push(value);
    }
    var request = 
    {
        operationId: this.data.customer.operationId,
        typeOperation: this.data.customer.typeOperation,
        numberDocument: this.data.customer.numberDocument,
        detail: nuevaLista
    }
    this.cotizacionService.updateCotizacion(request).subscribe(s=>{
      this.dialogRef.close(this.form.value);
    })
  }

  public compareFunction(o1: any, o2: any) {
    return (o1.name == o2.name && o1.code == o2.code);
  }

}

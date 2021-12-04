import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-coupon-dialog',
  templateUrl: './coupon-dialog.component.html',
  styleUrls: ['./coupon-dialog.component.scss'],
  providers: [ProductService]
})
export class CouponDialogComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public menuItems:any[] = []; 
  public form!: FormGroup;
  fileToUpload: any;
  imageUrl: any;
  disabledInput: boolean = true;

  listCategorias: any = [
    {
      value: "Puertas"
    },
    {
      value: "Motores"
    },
    {
      value: "Controles"
    },
    {
      value: "Portones"
    },
    {
      value: "Seguridad"
    }
  ];
  listSubCategorias: any [] = [];
  listSubCategoriasData: any[] = [
    {
      value: "Puertas levadizas",
      category: "Puertas",
      abreviatura: "PTL"
    },
    {
      value: "Puertas seccionales",
      category: "Puertas",
      abreviatura: "PTS"
    },
    {
      value: "Puertas corredizas",
      category: "Puertas",
      abreviatura: "PTC"
    },
    {
      value: "Puertas basculares",
      category: "Puertas",
      abreviatura: "PTB"
    },
    {
      value: "Puertas contrapeso",
      category: "Puertas",
      abreviatura: "PTCP"
    },
    {
      value: "Importados",
      category: "Motores",
      abreviatura: "MI"
    },
    {
      value: "Nacionales",
      category: "Motores",
      abreviatura: "MN"
    },
    {
      value: "Controles",
      category: "Controles",
      abreviatura: "CO"
    },
    {
      value: "Portones electricos",
      category: "Portones",
      abreviatura: "PTE"
    },
    {
      value: "Portones manuales",
      category: "Portones",
      abreviatura: "PTM"
    },
    {
      value: "Camara de vigilancia",
      category: "Seguridad",
      abreviatura: "CV"
    },
    {
      value: "Alarmas",
      category: "Seguridad",
      abreviatura: "AL"
    },
    {
      value: "Sensores",
      category: "Seguridad",
      abreviatura: "SE"
    },
    {
      value: "Videoporteros",
      category: "Seguridad",
      abreviatura: "VP"
    },
    {
      value: "Cercos electricos",
      category: "Seguridad",
      abreviatura: "CE"
    }
  ];
  constructor(public dialogRef: MatDialogRef<CouponDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              private productoService: ProductService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      category: new FormControl("",[Validators.required]),
      subCategory: new FormControl("",[Validators.required]),
      model: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),
      material: new FormControl("",[Validators.required]),
      dimensions: new FormControl("",[Validators.required]),
      color: new FormControl("",[Validators.required]),
      priceUnit: new FormControl("",[Validators.required])
    }); 

  }

  selectCategory(category: any){
    this.listSubCategorias = this.listSubCategoriasData.filter( s => s.category === category);
  }

  selectSubCategory(subCategory: any) {
    const value = this.listSubCategoriasData.find( s => s.value === subCategory);
    this.form.controls['model'].setValue(value.abreviatura);
  }

  handleFileInput(image: any) {
    const data: FileList = image.target.files;
    this.fileToUpload = data.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.disabledInput =  false;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  public onSubmit(){
    if(this.form.valid){
      const request = {
        category: this.form.controls["category"].value,
        subCategory: this.form.controls["subCategory"].value,
        model: this.form.controls["model"].value,
        brand: "coroda",
        description: this.form.controls["description"].value,
        origin: 1,
        material: this.form.controls["material"].value,
        dimensions: this.form.controls["dimensions"].value,
        color: this.form.controls["color"].value,
        priceUnit: this.form.controls["priceUnit"].value,
        // image: this.imageUrl.split(';base64,')[1]
        image: ''
      };
      console.log(request)
      this.productoService.createProduct(request).subscribe(s=>{
        this.dialogRef.close(this.form.value);
      });
    }
  } 

  public addMenuItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value; 
    if ((value || '').trim()) {
      this.menuItems.push( value.trim() );
    } 
    if (input) {
      input.value = '';
    }  
    // (this.form['controls'] as any).restriction['controls'].menuItems.patchValue(this.menuItems);
  }

  public removeMenuItem(item: any): void {
    const index = this.menuItems.indexOf(item); 
    if (index >= 0) {
      this.menuItems.splice(index, 1);
    }
    // (this.form['controls'] as any).restriction['controls'].menuItems.patchValue(this.menuItems);
  }


}

import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppService } from 'src/app/app.service';
import { emailValidator, maxWordsValidator } from 'src/app/theme/utils/app-validators';
import { ModalSendComponent } from './modal-send/modal-send.component';
import { ISurvey } from './model/checkout.request.model';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true; 
  public checkoutForm:FormGroup = new FormGroup({});
  public countries:any[] = [];
  public deliveryMethods:any[] = [];
  public months:any[] = [];
  public years:any[] = []; 
  public step = 0;
  public deliveryMethodSubmitted:boolean = false;
  public orderCompleted:boolean = false;
  public orderEmail:string = '';
  public formularioEncuesta = new FormGroup({
    pregunta1: new FormControl(),
    pregunta2: new FormControl(''),
    pregunta3: new FormControl(''),
    pregunta4: new FormControl(''),
    pregunta5: new FormControl(''),
    pregunta6: new FormControl(''),
    pregunta7: new FormControl(''),
    pregunta8: new FormControl(''),
    pregunta9: new FormControl(''),
    pregunta10: new FormControl(''),
    pregunta11: new FormControl(''),
    pregunta12: new FormControl('')
  });

  constructor(public appService:AppService, private fb: FormBuilder, private router: Router,
              private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.formularioEncuesta =  new FormGroup({
      pregunta1: new FormControl(''),
      pregunta2: new FormControl(''),
      pregunta3: new FormControl(''),
      pregunta4: new FormControl(''),
      pregunta5: new FormControl(''),
      pregunta6: new FormControl(''),
      pregunta7: new FormControl(''),
      pregunta8: new FormControl(''),
      pregunta9: new FormControl(''),
      pregunta10: new FormControl(''),
      pregunta11: new FormControl(''),
      pregunta12: new FormControl('')
    });
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };  
    this.countries = this.appService.getCountries();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears(); 
    this.checkoutForm = this.fb.group({ 
      deliveryAddress: this.fb.group({
        'firstName': [null, Validators.compose([Validators.required, maxWordsValidator(1)])],
        'lastName': [null, Validators.compose([Validators.required, maxWordsValidator(1)])],
        'middleName': [null, maxWordsValidator(1)], 
        'company': '',
        'email': [null, Validators.compose([Validators.required, emailValidator])],
        'phone': [null, Validators.required], 
        'country': [null, Validators.required],
        'city': [null, Validators.required],
        'place': [null, Validators.required],
        'postalCode': [null, Validators.required],
        'address': [null, Validators.required],
      }),
      deliveryMethod: this.fb.group({
        'method': [null, Validators.required]
      }),
      paymentMethod: this.fb.group({
        'cardHolderName': [null, Validators.required],
        'cardNumber': [null, Validators.required],
        'expiredMonth': [null, Validators.required],
        'expiredYear': [null, Validators.required],
        'cvv': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
      })
    }); 

  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }  

  sendRespuesta() {
    var list: ISurvey[] = [];
    list.push({numberQuestion: "1",question: "¿Te gustaría guardar todos tus pedidos en alguna cuenta de la empresa?",valor: this.formularioEncuesta.controls['pregunta1'].value})
    list.push({numberQuestion: "2",question: "¿Te gustan los beneficios que te brinda la cuenta de la empresa?",valor: this.formularioEncuesta.controls['pregunta2'].value})
    list.push({numberQuestion: "3",question: "¿Crees que son adecuadas las características del producto que brinda la página?",valor: this.formularioEncuesta.controls['pregunta3'].value})
    list.push({numberQuestion: "4",question: "¿Los productos ofertados en la página son los mismos que la empresa entrega?",valor: this.formularioEncuesta.controls['pregunta4'].value})
    list.push({numberQuestion: "5",question: "¿Estás de acuerdo con la forma como realizan las cotizaciones?",valor: this.formularioEncuesta.controls['pregunta5'].value})
    list.push({numberQuestion: "6",question: "¿Las cotizaciones están siendo elaboradas acorde a tus requerimientos?",valor: this.formularioEncuesta.controls['pregunta6'].value})
    list.push({numberQuestion: "7",question: "¿Te parece adecuado el tiempo que se toman en responder tus pedidos?",valor: this.formularioEncuesta.controls['pregunta7'].value})
    list.push({numberQuestion: "8",question: "¿Encuentras la información necesaria en un tiempo óptimo?",valor: this.formularioEncuesta.controls['pregunta8'].value})
    list.push({numberQuestion: "9",question: "¿Le gusta la atención brindada por la empresa?",valor: this.formularioEncuesta.controls['pregunta9'].value})
    list.push({numberQuestion: "10",question: "¿Recomendarías a la empresa por su calidad de servicio?",valor: this.formularioEncuesta.controls['pregunta10'].value})
    list.push({numberQuestion: "11",question: "¿Considera a Coroda Automatic Door SAC como una empresa líder dentro del mercado?",valor: this.formularioEncuesta.controls['pregunta11'].value})
    list.push({numberQuestion: "12",question: "¿Consideras que la empresa posee un crecimiento ascendente?",valor: this.formularioEncuesta.controls['pregunta12'].value})
    this.checkoutService.createSurvey(list).subscribe(s=>{
      const dialogRef = this.appService.openDialog(ModalSendComponent, '', 'theme-dialog');
      dialogRef.afterClosed().subscribe(cus => {  
        this.router.navigate(['/']);
      }); 
    });
  }
  
  public setStep(index: number) {
    this.step = index;
  }
  public onSubmitForm(form:any){
    if(this.checkoutForm.get(form)?.valid){
      this.nextStep(); 
    }
    if(form == 'deliveryMethod'){
      this.deliveryMethodSubmitted = true;
    }
  }
  public nextStep() {
    this.step++; 
  }
  public prevStep() {
    this.step--;
  }

  public placeOrder(){ 
    this.checkoutForm.updateValueAndValidity();
    this.checkoutForm.markAllAsTouched();
    if(this.checkoutForm.valid){
      this.step = 4;
      this.orderCompleted = true; 
      this.orderEmail = (this.checkoutForm.get('deliveryAddress') as any)['controls'].email.value; 
      this.checkoutForm.reset();
      this.appService.Data.cartList.length = 0;    
      this.appService.Data.totalPrice = 0;
      this.appService.Data.totalCartCount = 0;
    }   
  }
}

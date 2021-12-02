import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { DomSanitizer } from '@angular/platform-browser';
import { RegisterService } from '../shared/service/register.service';
import { IRegisterRequestModel } from '../shared/models/register/register.request.model';
import { saveToken } from '../shared/storage/token.storage';
import { LoginService } from '../shared/service/login.service';
import { ILoginRequestModel } from '../shared/models/login/login.request.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public hide = true; 
  public bgImage:any;
  constructor(public fb: FormBuilder, public router:Router, public snackBar: MatSnackBar, private sanitizer:DomSanitizer,
              private registerService: RegisterService, private loginService: LoginService) { }
  typeDocuments: any[] = [
    {value: '0', viewValue: 'DNI'},
    {value: '1', viewValue: 'RUC'},
    {value: '2', viewValue: 'CARNET EXTRANJERIA'}
  ];

  ngOnInit() {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/register.jpg)');
    this.registerForm = this.fb.group({ 
      typeDocument: ['', Validators.required],
      numeroDocumento: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      appPaterno: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      appMaterno: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      razonSocial: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      direccion: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      celular: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      typePerson: ['']
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  tipoDocumentoChange(event: any){
    if(event.value === "0" || event.value === "2") {
      this.registerForm.controls['razonSocial'].clearValidators();
      this.registerForm.controls['razonSocial'].updateValueAndValidity();
      this.registerForm.controls['nombre'].setValidators(Validators.required);
      this.registerForm.controls['nombre'].updateValueAndValidity();
      this.registerForm.controls['appPaterno'].setValidators(Validators.required);
      this.registerForm.controls['appPaterno'].updateValueAndValidity();
      this.registerForm.controls['appMaterno'].setValidators(Validators.required);
      this.registerForm.controls['appMaterno'].updateValueAndValidity();
      this.registerForm.controls['typePerson'].setValue('0');
    }
    if(event.value === "1") {
      this.registerForm.controls['nombre'].clearValidators();
      this.registerForm.controls['nombre'].updateValueAndValidity();
      this.registerForm.controls['appPaterno'].clearValidators();
      this.registerForm.controls['appPaterno'].updateValueAndValidity();
      this.registerForm.controls['appMaterno'].clearValidators();
      this.registerForm.controls['appMaterno'].updateValueAndValidity();
      this.registerForm.controls['razonSocial'].setValidators(Validators.required);
      this.registerForm.controls['razonSocial'].updateValueAndValidity();
      this.registerForm.controls['typePerson'].setValue('1');
    }
  }

  public onRegisterFormSubmit():void {
    if (this.registerForm.valid) {
      const registerRequest: IRegisterRequestModel = {
        typeDocument: this.registerForm.controls['typeDocument'].value,
        typePerson: this.registerForm.controls['typePerson'].value,
        numberDocument: this.registerForm.controls['numeroDocumento'].value,
        name: this.registerForm.controls['nombre'].value,
        lastName1: this.registerForm.controls['appPaterno'].value,
        lastName2: this.registerForm.controls['appMaterno'].value,
        socialReason: this.registerForm.controls['razonSocial'].value,
        address: this.registerForm.controls['direccion'].value,
        phone: this.registerForm.controls['celular'].value,
        email: this.registerForm.controls['email'].value,
        password: this.registerForm.controls['password'].value,
      };
      this.registerService.register(registerRequest).toPromise().then(s=>{
        const request: ILoginRequestModel = {
          email: registerRequest.email,
          password: registerRequest.password
        };
        this.loginService.createLogin(request).toPromise().then(s=>{
          this.loginService.login(request).toPromise().then(s=>{
            saveToken(JSON.stringify(s));
            this.router.navigate(['/']);
          });
        })
      });
    } else{
      this.snackBar.open('No se completo el registro!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }
}

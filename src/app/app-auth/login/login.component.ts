import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'; 
import { AppSettings, Settings } from 'src/app/app.settings';
import { ILoginRequestModel } from '../shared/models/login/login.request.model';
import { LoginService } from '../shared/service/login.service';
import { saveToken } from '../shared/storage/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  public bgImage:any;
  public settings: Settings;
  constructor(public fb: FormBuilder, public router:Router, private sanitizer:DomSanitizer, public appSettings:AppSettings,
              public loginService: LoginService, private _snackBar: MatSnackBar) { 
    this.settings = this.appSettings.settings; 
  }

  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/banner_login.png)');
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  public onLoginFormSubmit():void {
    const request: ILoginRequestModel = {
      email: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };
    const returnUrl = localStorage.getItem('temp_route');
    const redirectUrl = returnUrl != null ? returnUrl : '/';
    if (this.loginForm.valid) {
      this.loginService.login(request).subscribe(s=>{
        saveToken(JSON.stringify(s));
        if(s.rol == "Client"){
          this.router.navigate([redirectUrl]);
        }
        if(s.rol == "Admin"){
          this.router.navigate(['/admin']);
        }
      },
      err=>{
        this._snackBar.open("Se ingreso incorrecto el usuario o contraseña.");
        this.router.navigate(['/auth']);
      });
    }
  }

}

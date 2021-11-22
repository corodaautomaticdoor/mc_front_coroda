import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { removeToken } from 'src/app/app-auth/shared/storage/token.storage';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(public appService:AppService,private router:Router) { }

  ngOnInit() {
  }

  logout(){
    removeToken();
    this.router.navigate(['/auth'])
  }
}

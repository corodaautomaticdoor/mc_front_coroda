import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { removeToken } from 'src/app/app-auth/shared/storage/token.storage';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public userImage = 'assets/images/others/admin.jpg';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    removeToken();
    this.router.navigate(['/auth'])
  }
}

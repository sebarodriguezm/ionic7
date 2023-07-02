import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
   
    { title: 'Login', url: '/login', icon: 'call-outline' },
    { title: 'Home', url: '/menu/home', icon: 'person-outline' },
    { title: 'Registro', url: '/menu/register', icon: 'add-outline' },
    
 ];
  constructor() { }

  ngOnInit() {
  }

}

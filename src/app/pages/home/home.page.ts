import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  categories: string[] = ['Despensa', 'Hogar', 'Dulces y chocolate', 'Snacks', 'Pastas', 'Productos en conserva', 'Huevos', 'Desayuno',];
  constructor() { }

  ngOnInit() {
  }

}

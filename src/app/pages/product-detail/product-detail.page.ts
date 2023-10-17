import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, NavParams } from '@ionic/angular';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { ProductDto } from 'src/app/core/dto/product.dto';
import { CrudService } from 'src/app/providers/crud.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  id:string;
  producto: ProductDto= new ProductDto();
  categories: string[] = [
    'Full', 'Básico', 'Solo Cajas', 'Unitario'
  ]
  categoriesData: { [category: string]: any[] } = {};
  products:ProductDto[] = [];
  constructor(
    private crud: CrudService<ProductDto>,
    private navParams: NavParams,
    private route: ActivatedRoute,
  ) {
    this.crud = this.crud.newCrudInstance();
    this.crud.setTable(DbTables.Products); 
   }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      //console.log(this.id)
    }

    this.getProduct();
    this.getProducts();
  }

  getProduct() {
    if (this.id) {
      this.crud.getDocument(this.id).subscribe((data) => {
        this.producto = data;
       console.log('product', this.producto)
      });
    }
  }
  
  async getProducts() {
    this.crud.getCollection().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (error: any) => {
        // Manejar errores
      }
    });
  }

  categoriesDataKeys() {
    return Object.keys(this.categoriesData);
  }

  selectToUpdate(products:any) {

    this.products = this.products.filter(e => e.id !== products.id);
    this.products.unshift(products);
  

  }
  

}

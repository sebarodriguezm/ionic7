import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonContent,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { ProductDto } from 'src/app/core/dto/product.dto';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CrudService } from 'src/app/providers/crud.service';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { UtilsService } from 'src/app/services/utils.service';
import { UserDto } from 'src/app/core/dto/user.dto';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { categoryDto } from 'src/app/core/dto/category.dto';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  textSearch: string;
  product: ProductDto = new ProductDto();
  categories: string[] = ['Despensa', 'Hogar', 'Dulces y chocolate', 'Snacks', 'Pastas', 'Productos en conserva', 'Huevos', 'Desayuno',];
  productList: ProductDto[] = [];
  bol: boolean = true;
  showForm = false;
  efect = '';
  action: string = '';
  categoriesData: { [category: string]: any[] } = {};
  currentUser: any;
  logged:UserDto = new UserDto();
  category: any;
  constructor(
    private utils: UtilsService,
    private crud: CrudService<ProductDto>,
    private userService: CrudService<UserDto>,
    private crudCategory: CrudService<categoryDto>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.crud = this.crud.newCrudInstance();
    this.crud.setTable(DbTables.Products);

    this.userService = this.userService.newCrudInstance();
    this.userService.setTable(DbTables.Users); 

    this.crudCategory = this.crudCategory.newCrudInstance();
    this.crudCategory.setTable(DbTables.Categories); 
  }

  ngOnInit() {
    this.getProducts();
    this.category = this.route.snapshot.params['category'];
    const auth = getAuth();
       
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
        console.log('currentuser',this.currentUser)
        if(this.currentUser){
          this.datos();
        }
        
        // Resto del código...
      } else {
        // Resto del código...
      }
    });    
  }

  datos(){
    console.log('1',this.currentUser?.uid)   
  
      this.userService.getDocument(this.currentUser.uid).subscribe(data => {
     
        this.logged=data;
        console.log('datoslogged', this.logged)
      });
  
    
       
     }

  showCreate(act:any) {
    this.showForm = !this.showForm;
    this.utils.animation();
    this.product = new ProductDto();
    this.action = act;
  }

  async getProducts() {
    this.crud.getCollection().subscribe({
      next: (data: any) => {
        this.productList = data.sort((a: any, b: any) => {
          const categoryA = a.category.toLowerCase();
          const categoryB = b.category.toLowerCase();
          return categoryA.localeCompare(categoryB);
        });
  
        // Filtrar la lista según la categoría proporcionada en la ruta
        if (this.category && this.categories.includes(this.category)) {
          this.productList = this.productList.filter((p) => p.category === this.category);
        }
      }
    });
  }
  


  categoriesDataKeys() {
    return Object.keys(this.categoriesData);
  }

  async addProduct() {
    let id = Date.now() + Math.floor((Math.random() * 19495) + 10000);
    this.product.id = id;
    let arrySearch: any = [];
    arrySearch.push(this.product.name);
    this.product.arraySearch = this.crud.getArraySearchDes(arrySearch);
  
    this.crud.addToCollection(this.product).then(async res => {
      this.utils.presentToast({
        message: 'Agregado exitosamente',
        color: 'success',
        duration: 1000,
        icon: 'checkmark-circle-outline'
      });
      this.getProducts();
      this.product = new ProductDto();
    }).catch(e => {

    });
    this.showForm = !this.showForm;
  }

  delete(id: string) {
    this.crud.deleteDocument(id).then(res => {
      this.utils.presentToast({
        message: 'Eliminado exitosamente',
        color: 'success',
        duration: 1000,
        icon: 'checkmark-circle-outline'
      })
    }, error => {
      
    })
  }

  async uploadPhoto() {

    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      promptLabelHeader: 'Foto de perfil',
      source: CameraSource.Photos
    });

    this.product.image = image.dataUrl;
  }

  async verProduct(product: any) {
    this.utils.goTo('/product-detail',product.id)
  }

  back(){
    this.router.navigate(['/home']);
  }
}

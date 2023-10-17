import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';


import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CrudService } from './providers/crud.service';
import { DbTables } from './core/constants/db-tables.constant';
import { UserDto } from './core/dto/user.dto';
import { register } from 'swiper/element/bundle';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  currentUser: any;
  logged:UserDto = new UserDto();
    public userList: UserDto[] = [];
  public otherLang = '';

  private _otherLang = '';
  private suscribeLang: Subscription = new Subscription;
  urlLogin: any;

  public appPages = [
    {
      title: 'Árbol de decisiones',
      url: '/cards',
      icon: 'albums'
    },
    {
      title: 'Códigos',
      url: '/category',
      icon: 'apps'
    },
    {
      title: 'Cursos',
      url: '/courses',
      icon: 'book'
    },
    {
      title: 'Programas',
      url: '/programs',
      icon: 'medical'
    },
    {
      title: 'Notificaciones',
      url: '/notifications',
      icon: 'document-text'
    },
    {
      title: 'Eventos',
      url: '/events',
      icon: 'sparkles'
    },
    {
      title: 'Administradores',
      url: '/admin-list',
      icon: 'person'
    },
    {
      title: 'Términos',
      url: '/terms',
      icon: 'document-text'
    },
    {
      title: 'Perfil',
      url: '/profile',
      icon: 'id-card'
    },
    {
      title: 'Salir',
      url: '/logout',
      icon: 'exit'
    }

   

  ];


  constructor(
    private platform: Platform,
    private userService: CrudService<UserDto>,
    private storage: Storage,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeApp();
    this.userService = this.userService.newCrudInstance();
    this.userService.setTable(DbTables.Users);
  }


  async ngOnInit() {
    await this.storage.create();

        const auth = getAuth();
        this.loadUsers();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.currentUser = user;
            const serializedUserInfo = JSON.stringify(this.currentUser);
            this.storage.set('currentUser', serializedUserInfo);
            console.log(this.currentUser)
            this.datos();
            // Resto del código...
          } else {
            // Resto del código...
          }
        });  
        this.isLoginPage();  
  }

  datos(){
    console.log(this.currentUser?.uid)   
    
       this.userService.getDocument(this.currentUser?.uid).subscribe(data => {
     
         this.logged=data;
         console.log('datoslogged', this.logged)
       });
   
     }

     loadUsers() {
      this.userService.getCollection()
        .subscribe(data => {
          this.userList = data;
         
          this.userList = this.userList.filter(usuario => {
            return (usuario.isDelete === false || typeof (usuario.isDelete) == "undefined");
          })
          // console.log('UserService>Snapshot', data);
        });
    }

  initializeApp() {
    this.platform.ready().then(() => {
      
    });
  }

  isLoginPage() {
    console.log('url', this.router.url);
    console.log('urlLogin', this.urlLogin);
    if (this.router.url === '/') {
      localStorage.clear();
      console.log('hola');
      this.urlLogin = true;
      console.log('hola', this.urlLogin);
    } else {
      this.urlLogin = false;
      console.log('chao', this.urlLogin);
    }
  }
  
 
}

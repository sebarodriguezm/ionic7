import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';




import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase/compat/app';
import { AngularFireModule } from '@angular/fire/compat';

// Other import statements and module configuration

import {
  AngularFirestoreModule,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

//import { Camera } from '@ionic-native/camera/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
  TranslatePipe,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
//import { ImageResizer } from '@ionic-native/image-resizer/ngx';

//import { CallNumber } from '@ionic-native/call-number/ngx';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CrudService } from './providers/crudservice.service';



//import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';




export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forChild(),
    HttpClientModule,

    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (customTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
 
    CrudService,
   
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  ],
  bootstrap: [AppComponent],
  exports: [TranslateModule],
})
export class AppModule {
  constructor(private afs: AngularFirestore) {
    this.afs.firestore
      .enablePersistence()
      .then(() => {
        // Initialize Cloud Firestore through firebase
        console.log('Persistencia activada');
      })
      .catch((err) => {
        console.log('Error de persistencia');

        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
  }
}

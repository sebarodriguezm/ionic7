import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { IonicStorageModule } from '@ionic/storage-angular';

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

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
//import { ImageResizer } from '@ionic-native/image-resizer/ngx';
import { CrudService } from './providers/crud.service';
//import { CallNumber } from '@ionic-native/call-number/ngx';
import { UserRegistrationService } from './providers/user.registration.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ComponentSharedModule } from './components/components-shared.module';

//import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
    
   
  ],
  providers: [
    UserRegistrationService,
    CrudService,

    Clipboard,
    UserRegistrationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

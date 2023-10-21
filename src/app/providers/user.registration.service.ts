import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs-compat/Observable';
import * as firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { UserDto } from '../core/dto/user.dto';
import { CrudService } from './crud.service';
import { DbTables } from '../core/constants/db-tables.constant';


const table = 'usuarios';


@Injectable()
export class UserRegistrationService {

  private fireAuth: any;

  private downloadURL: string = '';


  constructor(
    private afs: AngularFirestore,
    private userDataService: CrudService<UserDto>
  ) {
    this.fireAuth = firebase.default.auth();

    this.userDataService.setTable(DbTables.Users);
  }

  loginUser(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
    /*              .then(user =>{
                   return this.userDataService.getDocument(user.user.uid).toPromise()
                 }); */
  }

  signupUser(user:any, password: string, fullname?: string, phone?: string, email?: string, userType?: string, birthday?:number) {

    return this.fireAuth.createUserWithEmailAndPassword(user.email, password)
    .then((newUser: { user: { uid: string | undefined; }; }) => {
      //console.log('signupUser>newUser, user', newUser, user);
      let user: UserDto = {
        id: newUser.user.uid,
        email: email,
        fullName: fullname,
        phone: phone,
        birthday: birthday
   
      };
      return this.userDataService.copyToCollection(user);     

      let th = this;
      var user2 = this.fireAuth.currentUser;
      user2.updateProfile({
        displayName: user.fullName,
        photoURL: user.country+';'+user.level
      }).then(function() {
      }).catch(function(error: any) {
        return th.userDataService.copyToCollection(user);
      });

      //return this.userDataService.copyToCollection(user);
    });
  }
  
  resetPassword(email: any) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser() {
    localStorage.clear();
    return this.fireAuth.signOut();
  }

  getLoggedInUser() {
    return this.fireAuth.currentUser;
  }
  /*getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user: any) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }*/

  verifyLogin(){
    return new Promise<any>(async(resolve, reject) => { this.fireAuth.onAuthStateChanged((data:any) => {
      if (data) {
        //console.log('user logged in::> ', data.uid);
        
        resolve(data.uid);
      }
      else
      {
        resolve(null);
      }
    })
  });
  }
}
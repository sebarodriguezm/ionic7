import { Component, OnInit } from '@angular/core';
import { UserDto } from '../core/dto/user.dto';
import { CrudService } from '../providers/crud.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DbTables } from '../core/constants/db-tables.constant';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser: any;
  logged:UserDto = new UserDto();

  constructor(
    private userService: CrudService<UserDto>,
    private menuCtrl: MenuController
  ) {
    this.userService = this.userService.newCrudInstance();
    this.userService.setTable(DbTables.Users); 
  }
   

  ngOnInit() {
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

     menu() {
      this.menuCtrl.open(); 
    }
}

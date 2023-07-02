import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserAdmDto } from 'src/app/core/dto/user-adm.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
admin: UserAdmDto= new UserAdmDto();
  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

}

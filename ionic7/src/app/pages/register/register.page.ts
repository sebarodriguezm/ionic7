import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilsComponent } from 'src/app/components/utils/utils.component';
import { UserAdmDto } from 'src/app/core/dto/user-adm.dto';
import { CrudService } from 'src/app/providers/crudservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  admin: UserAdmDto = new UserAdmDto();
  constructor(
    private translate: TranslateService,
    private crud: CrudService<UserAdmDto>,
    private route: Router,
    private utils: UtilsComponent
  ) {}

  ngOnInit() {}

  registerAdmin() {
    const msg = this.translate.instant('REGISTER.Loading');
    this.utils.showLoading(msg);
    this.crud.RegisterAdmin(this.admin, this.admin.password!).then((res) => {
        this.admin = new UserAdmDto(); // Reiniciar el objeto "term" después de agregarlo
        this.utils.hideLoading();
        const msg = this.translate.instant('REGISTER.Success');
        this.utils.message(msg, 1, 'toast-success');
        this.route.navigate(['/login']);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  goLogin() {
    this.route.navigate(['/login']);
  }
}

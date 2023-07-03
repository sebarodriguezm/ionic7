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
    this.crud.RegisterAdmin(this.admin, this.admin.password!)
      .then((res) => {
        this.admin = new UserAdmDto(); // Reiniciar el objeto "term" después de agregarlo
        this.utils.hideLoading();
        const successMsg = this.translate.instant('REGISTER.Success');
        this.utils.message(successMsg, 1, 'toast-success', 'success');
        this.route.navigate(['/login']);
      })
      .catch((error) => {
        this.utils.hideLoading();
        if (error === 'Mail already exists in database') {
          let errMsg = this.translate.instant('REGISTER.Err2');
          this.utils.message(errMsg, 1, 'toast-error', 'danger');
        } else {
          let errMsg = this.translate.instant('REGISTER.Err');
          this.utils.message(errMsg, 1, 'toast-error', 'danger');
        }
        console.log(error);
      });
  }
  

  goLogin() {
    this.route.navigate(['/login']);
  }
}

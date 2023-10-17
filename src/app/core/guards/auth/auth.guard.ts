import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { UserRegistrationService } from 'src/app/providers/user.registration.service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserRegistrationService,
         private router: Router,
         private auth: AngularFireAuth) { }

    canActivate(): Observable<boolean> {
        return this.auth.authState.pipe(
          take(1),
          map(user => {
            if (user) {
              return true; // El usuario está autenticado
            } else {
              this.router.navigate(['/login']);
              return false; // El usuario no está autenticado
            }
          })
        );
      }
}
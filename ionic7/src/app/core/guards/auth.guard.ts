import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {

  constructor(private auth: AngularFireAuth,
    private router: Router,
    ) {

  }
  
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
    
  

  


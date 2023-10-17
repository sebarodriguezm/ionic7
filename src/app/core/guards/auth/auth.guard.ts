import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { UserRegistrationService } from 'src/app/providers/user.registration.service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserRegistrationService, private router: Router) { }

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.userService.getCurrentUser()
                .then(user => {
                    resolve(true);
                }, err => {
                    this.router.navigate(['/login']);
                    resolve(false);
                })
        })
    }
}
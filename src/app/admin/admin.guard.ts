import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../services/users.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private usersService: UsersService,
                private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.usersService.getUserByTicket().map(response => {
            if(response.userProfile) {
                return true;
            } else {
                this.router.navigate(["admin","login"]);
                return false;
            }
        });
    }
}

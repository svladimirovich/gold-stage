import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { UsersService } from '../services/users.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private cookieService: CookieService,
                private usersService: UsersService,
                private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const ticket = this.cookieService.get('Ticket');
        const deny = () => {
            this.router.navigate(["admin","login"]);
            return false;
        }
        if(!!ticket) {
            return this.usersService.getUserByTicket(ticket).map(response => {
                if(response.userProfile)
                    return true;
                return deny();
            });
        }
        return deny();

    }
}

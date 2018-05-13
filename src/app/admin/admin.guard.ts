import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private cookieService: CookieService,
                private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            const ticket = this.cookieService.get('Ticket');
            if(!!ticket) {
                return true;
            } else {
                this.router.navigate(["admin","login"]);
                return false;
            }
    }
}

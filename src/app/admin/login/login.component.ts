import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'ngx-cookie';

import { ClientConfiguration } from '../../../../config.client';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    private configuration: ClientConfiguration = new ClientConfiguration();

    constructor(private http: HttpClient,
                private router: Router,
                private cookieService: CookieService) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'login': new FormControl(''),
            'password': new FormControl('')
        })
    }

    onSubmit() {

        this.http.post(`${this.configuration.BaseUrl}/api/users/login`, this.loginForm.value)
        .subscribe((response: any) => {
            if(response.ticket) {
                console.log("Logged in successfully", response);
                this.cookieService.put('Ticket', response.ticket, { path: '/'});
                this.router.navigate(['admin','events']);
            }
        }, error => {
            console.log("some shit gone wrong", error);
        })
    }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ClientConfiguration } from '../../../../config.client';
import { AppState } from '../../app.reducers';
import { LoggingInAction } from './login.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    private configuration: ClientConfiguration = new ClientConfiguration();
    private subscription: Subscription;

    public loginForm: FormGroup;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'login': new FormControl(''),
            'password': new FormControl('')
        });
        this.subscription = this.store.select('adminLogin').subscribe(loginState => {
            console.log("Received Login State update:", loginState);
        })
    }

    onSubmit() {
        this.store.dispatch(new LoggingInAction(this.loginForm.value));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

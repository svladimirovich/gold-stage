import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
        this.loginForm = new FormGroup({
            'username': new FormControl(''),
            'password': new FormControl('')
        })
    }

    onSubmit() {
        console.log('submitting form', this.loginForm);
  }

}

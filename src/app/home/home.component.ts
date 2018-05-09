import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    public title = "GoldStage";

    constructor() { }

    ngOnInit() {
    }

    onNavClick(anchorName) {
        document.querySelector(`a[name='${anchorName}']`).scrollIntoView({ behavior: 'smooth' });
        return false;
    }
}

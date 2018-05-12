import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }, {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: "enabled" })        
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
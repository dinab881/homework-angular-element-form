/**
 * Created by dina on 18.06.18.
 */
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { RegistrationComponent }   from './registration/registration.component';

const appRoutes: Routes = [
    { path: 'register', component: RegistrationComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

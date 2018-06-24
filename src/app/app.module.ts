import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module



import { RegistrationComponent } from './registration/registration.component';
import {createCustomElement} from '@angular/elements';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [RegistrationComponent]

})
export class AppModule {
  constructor(private injector: Injector) {
    const registerElement  = createCustomElement(RegistrationComponent, {injector});
    customElements.define('registration-form', registerElement);
 }

 ngDoBootstrap() { }

}

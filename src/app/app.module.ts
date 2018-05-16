import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ReceiptComponent } from './receipt/receipt.component';
import {UserSessionService} from './user-session.service';
import {AuthGuard} from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'receipt',
        canActivate: [AuthGuard],
        component: ReceiptComponent
      }
    ]),
    FormsModule
  ],
  providers: [UserSessionService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}

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
import {ReactiveFormsModule} from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {HttpClientModule} from '@angular/common/http';
import { BillPrintComponent } from './bill-print/bill-print.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAUexnEYlWzDrw-hYmCugjuKI4B5FoNsB4',
  authDomain: 'bill-print-b3097.firebaseapp.com',
  databaseURL: 'https://bill-print-b3097.firebaseio.com',
  projectId: 'bill-print-b3097',
  storageBucket: 'bill-print-b3097.appspot.com',
  messagingSenderId: '39501510656'
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReceiptComponent,
    SettingsComponent,
    BillPrintComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
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
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        component: SettingsComponent
      },
      {
        path: 'generate-bill',
        canActivate: [AuthGuard],
        component: BillPrintComponent
      }
    ]),
    FormsModule
  ],
  providers: [UserSessionService, AuthGuard, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}

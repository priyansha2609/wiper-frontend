import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CustomerDashboardPage } from '../pages/customer-dashboard/customer-dashboard';
import { RegisterCustomerPage } from '../pages/register-customer/register-customer';
import { VehicleDetailPage } from '../pages/vehicle-detail/vehicle-detail';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

const firebaseAuth = {
      apiKey: "AIzaSyCkaY1ew3OshdzOxJzlA8B8phpVUL_RTIk",
      authDomain: "wiper-3cc3d.firebaseapp.com",
      databaseURL: "https://wiper-3cc3d.firebaseio.com",
      projectId: "wiper-3cc3d",
      storageBucket: "wiper-3cc3d.appspot.com",
      messagingSenderId: "592527069757"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterCustomerPage,
    CustomerDashboardPage,
    VehicleDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterCustomerPage,
    CustomerDashboardPage,
    VehicleDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

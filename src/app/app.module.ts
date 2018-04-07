import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginPhonePage } from '../pages/login-phone/login-phone';
import { CustomerDashboardPage } from '../pages/customer-dashboard/customer-dashboard';
import { RegisterCustomerPage } from '../pages/register-customer/register-customer';
import { VehicleDetailPage } from '../pages/vehicle-detail/vehicle-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { MapsPage } from '../pages/maps/maps';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
<<<<<<< Updated upstream
import { AgmCoreModule } from '@agm/core';
=======
import firebase from 'firebase';
>>>>>>> Stashed changes

const firebaseAuth = {
      apiKey: "AIzaSyCkaY1ew3OshdzOxJzlA8B8phpVUL_RTIk",
      authDomain: "wiper-3cc3d.firebaseapp.com",
      databaseURL: "https://wiper-3cc3d.firebaseio.com",
      projectId: "wiper-3cc3d",
      storageBucket: "wiper-3cc3d.appspot.com",
      messagingSenderId: "592527069757"
  };

  firebase.initializeApp(firebaseAuth);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterCustomerPage,
    CustomerDashboardPage,
    VehicleDetailPage,
    TabsPage,
    MapsPage,
    LoginPhonePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
         apiKey: "AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE",
         libraries: ["places"]
     })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterCustomerPage,
    CustomerDashboardPage,
    VehicleDetailPage,
    TabsPage,
    MapsPage,
    LoginPhonePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
  ]
})
export class AppModule {}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { VehicleDetailPage } from '../vehicle-detail/vehicle-detail';

/**
 * Generated class for the CustomerDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-dashboard',
  templateUrl: 'customer-dashboard.html',
})
export class CustomerDashboardPage {

  customer : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.http.get('http://localhost:3000/getCustomerById?customerId=1')
    .map(res => res.json())
    .subscribe(
      data => {
          this.customer = data;
          console.log(this.customer);
      },
      err => {
           console.log("Oops!");
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDashboardPage');
  }

  itemSelected(vehicle) {
    console.log(vehicle);
    this.navCtrl.push(VehicleDetailPage, { vehicle : vehicle } );
  }
}

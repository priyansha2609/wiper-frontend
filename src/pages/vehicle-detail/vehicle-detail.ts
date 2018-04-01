import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VehicleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicle-detail',
  templateUrl: 'vehicle-detail.html',
})
export class VehicleDetailPage {

  public vehicle : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehicle = navParams.get('vehicle');
    console.log("Logging vehicle in vehicle detail");
    console.log(this.vehicle);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleDetailPage');
  }

}

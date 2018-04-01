import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register-customer',
  templateUrl: 'register-customer.html',
})
export class RegisterCustomerPage {


	@ViewChild('username') user;
	@ViewChild('password') password;
  @ViewChild('phoneNumber') phoneNumber;
  @ViewChild('corrAddress') corrAddress;

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterCustomerPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.user.value , this.password.value)
    .then(data => {
      console.log('got data ', data);
      this.alert('Registered!');
    })
    .catch(error => {
      console.log('got an error ', error);
      this.alert(error.message);
    });
  	console.log('Would register user with ', this.user.value, this.password.value);
  }

}

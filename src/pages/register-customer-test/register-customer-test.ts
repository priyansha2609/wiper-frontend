import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Customer } from '../../app/Domain/customer';
import { correspondenceAddress } from '../../app/Domain/correspondenceAddress';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AgmMap } from '@agm/core';


// import { Http,Response } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable'

@IonicPage()
@Component({
  selector: 'page-register-customer-test',
  templateUrl: 'register-customer-test.html',
})
export class RegisterCustomerTestPage {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef;
  @ViewChild(AgmMap)
  public agmMap: AgmMap;

  customer =  new Customer();
  correspondenceAddress =  new correspondenceAddress();
	@ViewChild('password') password;
  // @ViewChild('phoneNumber') phoneNumber;
  // @ViewChild('sublocality_level_2') sublocality_level_2;
  // @ViewChild('sublocality_level_1') sublocality_level_1;
  // @ViewChild('locality') locality;

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private http:Http) {
                this.zoom = 4;
                this.latitude = 39.8282;
                this.longitude = -98.5795;
                //create search FormControl
                this.searchControl = new FormControl();
                //set current position
                this.setCurrentPosition();

  // @ViewChild('corrAddress') corrAddress;
  //
  // areas : any;
  // cities : any;
  //
  // constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  //
  //       Observable.forkJoin(
  //       this.http.get('http://localhost:3000/getAllCities').map((res: Response) => res.json()),
  //       this.http.get('http://localhost:3000/getAllAreas').map((res: Response) => res.json()))
  //       .subscribe(
  //         data => {
  //             this.cities = data[0];
  //             this.areas = data[1];
  //             console.log(this.areas);
  //             console.log(this.cities);
  //         },
  //         err => {
  //              console.log("Oops!");
  //          });
  }

    ionViewDidLoad() {
      //set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      let componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name',
        sublocality_level_1 : 'short_name',
        sublocality_level_2 : 'short_name'
      };

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox);
          autocomplete.addListener("place_changed", () => {
              this.ngZone.run(() => {
                  //get the place result
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                  console.log(place);

                  for (let i = 0; i < place.address_components.length; i++) {
                      var addressType = place.address_components[i].types[0];
                      if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        console.log(addressType);
                        console.log(val);
                        if(addressType === "postal_code"){
                          this.correspondenceAddress.pin = val;
                        }
                        // if(addressType === "locality"){
                        //   this.locality.value = val;
                        // }
                        // if(addressType === "sublocality_level_2"){
                        //   this.sublocality_level_2.value = val;
                        // }
                      }
                  }
                  this.customer.correspondenceAddress = this.correspondenceAddress;
                  //verify result
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  // this.subLocalityLevel1 = place.address_components[4]['sublocality_level_1'];

                  //set latitude, longitude and zoom
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();
                  this.zoom = 12;
              });
          });
      });
  }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.customer.name , this.password.value)
    .then(data => {
      //let customerPromise = addCustomer();
      let url = 'http://localhost:3000/insertCustomer'
      //this.customer.correspondenceAddress.pin = this.

  let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post(url, this.customer, options)
                .subscribe(
   (data) => {console.log("success"); console.log('got data ', data);
   this.alert('Registered!');}, // Reach here if res.status >= 200 && <= 299
   (err) => console.log("failed"));

    //  console.log(customerPromise);

    })
    .catch(error => {
      console.log('got an error ', error);
      this.alert(error.message);
    });

  }

  addCustomer(){
    let url = 'http://localhost:3000/insertCustomer'
    //this.customer.correspondenceAddress.pin = this.

let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, this.customer, options);

}


}

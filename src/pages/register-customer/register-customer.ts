import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AgmMap } from '@agm/core';
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
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef;
  @ViewChild(AgmMap)
  public agmMap: AgmMap;

	@ViewChild('username') user;
	@ViewChild('password') password;
  @ViewChild('phoneNumber') phoneNumber;
  @ViewChild('sublocality_level_2') sublocality_level_2;
  @ViewChild('sublocality_level_1') sublocality_level_1;
  @ViewChild('locality') locality;

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
                this.zoom = 4;
                this.latitude = 39.8282;
                this.longitude = -98.5795;
                //create search FormControl
                this.searchControl = new FormControl();
                //set current position
                this.setCurrentPosition();
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
          let defaultBounds = new google.maps.LatLngBounds();

          // let defaultBounds = new google.maps.LatLngBounds
          //                       (new LatLng(23.63936, 68.14712),
          //                        new LatLng(28.20453, 97.34466));
          let options = {
              bounds : defaultBounds,
              type :["address"]
          };
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, options);
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
                        if(addressType === "sublocality_level_1"){
                          this.sublocality_level_1.value = val;
                        }
                        if(addressType === "locality"){
                          this.locality.value = val;
                        }
                        if(addressType === "sublocality_level_2"){
                          this.sublocality_level_2.value = val;
                        }
                      }
                  }

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

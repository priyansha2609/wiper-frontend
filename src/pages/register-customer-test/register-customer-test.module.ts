import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCustomerTestPage } from './register-customer-test';

@NgModule({
  declarations: [
    RegisterCustomerTestPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCustomerTestPage),
  ],
})
export class RegisterCustomerTestPageModule {}

import { correspondenceAddress } from './correspondenceAddress';
export class Customer {
   customerId: number;
   name: string;
   aadharNumber : string;
   isActive : boolean;
   correspondenceAddress : correspondenceAddress;
   constructor() {
   }
}

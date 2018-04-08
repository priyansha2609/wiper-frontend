import { Area } from './area';
import { City } from './city';

export class correspondenceAddress {
    addressId : number;
   	flatNo : string ;
   	building : string ;
   	pin : number ;
    city : City;
    area : Area;
   constructor() {
   }
}

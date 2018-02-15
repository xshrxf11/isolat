import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'https://mpt.i906.my/api/prayer/3.139003,101.686855';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getTimePrayer() {
    return new Promise(resolve => {
      
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}

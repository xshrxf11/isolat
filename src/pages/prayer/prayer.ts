import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';


/**
 * Generated class for the PrayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prayer',
  templateUrl: 'prayer.html',
})
export class PrayerPage {

  time_prayer: any;
  currentDate:any;
  currentTime:any;
  formattedDate:any;
  solat:any;
  time:any;
  next_solat:any;
  next_time:any;
  subuh:any;
  zohor:any;
  asar:any;
  maghrib:any;
  isyak:any;  
  place:any;
  api_provider:any;
  current:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) 
  {
    this.currentDate =  new Date();
    this.getTimePrayer();
    
    this.currentTime = this.currentDate.getTime();
    
    
  }

  getTimePrayer(){
    var dateObj = new Date();
    var date = dateObj.getDate();
    this.restProvider.getTimePrayer()
    .then(data => {
      this.time_prayer = data;
      let prayer ={
        place: this.time_prayer.data.place,
        provider: this.time_prayer.data.provider,
        subuh: this.time_prayer.data.times[date-1][0] * 1000,
        zohor: this.time_prayer.data.times[date-1][2]  * 1000,
        asar: this.time_prayer.data.times[date-1][3]  * 1000,
        maghrib: this.time_prayer.data.times[date-1][4]  * 1000,
        isyak: this.time_prayer.data.times[date-1][5]  * 1000,
      };
      this.place = prayer.place;
      this.api_provider = prayer.provider;
      this.subuh = prayer.subuh;
      this.zohor = prayer.zohor;
      this.asar = prayer.asar;
      this.maghrib = prayer.maghrib;
      this.isyak = prayer.isyak;

      if(this.currentTime >= prayer.isyak){
        this.current = 'isyak';
        this.time = this.isyak;
        this.solat = 'Isyak';
        this.next_time = this.isyak;
        this.next_solat = 'Isyak';
      }
      else if(this.currentTime >= prayer.maghrib){
        this.current = 'maghrib';
        this.time = this.maghrib;
        this.solat = 'Maghrib';
      }
      else if(this.currentTime >= prayer.asar){
        this.current = 'asar';
        this.time = this.asar;
        this.solat = 'Asar';
      }
      else if(this.currentTime >= prayer.zohor){
        this.current = 'zohor';
        this.time = this.zohor;
        this.solat = 'Zohor';
        this.next_time = this.asar;
        this.next_solat = 'Asar';
      }
      else if(this.currentTime >= prayer.subuh){
        this.current = 'subuh';
        this.time = this.subuh;
        this.solat = 'Subuh';
      }

      
    });

  }

}

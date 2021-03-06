import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  time_prayer: any;
  tomorrow:any;
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
  
  

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.currentDate =  new Date();
    
    
    this.getFormattedDate();
    
    this.currentTime = this.currentDate.getTime();
    this.next_solat = this.next_solat;
    this.next_time = this.next_time;
    
  }

  getFormattedDate(){
    var dateObj = new Date();

    var year = dateObj.getFullYear().toString();
    var month = dateObj.getMonth().toString();
    var date = dateObj.getDate();

       
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var next_day = tomorrow.getDate();
    
    

    var monthArray = ['Jan', 'Feb'];

    this.formattedDate = year + '-' + monthArray[month] + '-'+ date.toString();
    this.restProvider.getTimePrayer()
    .then(data => {
      this.time_prayer = data;
      let prayer ={
        place: this.time_prayer.data.place,
        subuh: this.time_prayer.data.times[date-1][0] * 1000,
        zohor: this.time_prayer.data.times[date-1][2]  * 1000,
        asar: this.time_prayer.data.times[date-1][3]  * 1000,
        maghrib: this.time_prayer.data.times[date-1][4]  * 1000,
        isyak: this.time_prayer.data.times[date-1][5]  * 1000,
      };
      this.place = prayer.place;
      this.subuh = prayer.subuh;
      this.zohor = prayer.zohor;
      this.asar = prayer.asar;
      this.maghrib = prayer.maghrib;
      this.isyak = prayer.isyak;
      if(this.currentTime >= prayer.isyak){
        this.time = this.isyak;
        this.solat = 'Isyak';
        this.next_time = this.time_prayer.data.times[next_day-1][0] * 1000;
        this.next_solat = 'Subuh';
      }
      else if(this.currentTime >= prayer.maghrib){
        this.time = this.maghrib;
        this.solat = 'Maghrib';
        this.next_time = this.isyak;
        this.next_solat = 'Isyak';
      }
      else if(this.currentTime >= prayer.asar){
        this.time = this.asar;
        this.solat = 'Asar';
        this.next_time = this.maghrib;
        this.next_solat = 'Maghrib';
      }
      else if(this.currentTime >= prayer.zohor){
        this.time = this.zohor;
        this.solat = 'Zohor';
        this.next_time = this.asar;
        this.next_solat = 'Asar';
      }
      else if(this.currentTime >= prayer.subuh){
        this.time = this.subuh;
        this.solat = 'Subuh';
        this.next_time = this.zohor;
        this.next_solat = 'Zohor';
      }
      
      
      console.log(this.time_prayer);
      
    });

  }

}

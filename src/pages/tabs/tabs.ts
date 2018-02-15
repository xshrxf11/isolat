import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PrayerPage } from '../prayer/prayer';
import { MorePage } from '../more/more';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PrayerPage;
  tab3Root = MorePage;

  constructor() {

  }
}

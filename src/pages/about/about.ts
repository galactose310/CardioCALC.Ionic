import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConditionsPage } from '../conditions/conditions';

/*
  Generated class for the AboutPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    
    conditionsPage: any = { component: ConditionsPage }
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {}
    
    openPage(page)
    {
        this.navCtrl.setRoot(page.component);
    }
}

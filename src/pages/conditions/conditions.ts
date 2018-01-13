import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-conditions',
  templateUrl: 'conditions.html',
})

export class ConditionsPage
{
    homePage: any = { component: HomePage }
    
    userAcceptsAvert: boolean = false;
    userAcceptsConditions: boolean = false;
    
    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        localStorage.setItem("first_version_conditions_accepted", JSON.stringify("false"));
    }
    
    accept(): void
    {
        localStorage.setItem("first_version_conditions_accepted", JSON.stringify("true"));
    }
    
    openPage(page)
    {
        this.navCtrl.setRoot(page.component);
    }
}

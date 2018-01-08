import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BerthelotPage } from '../berthelot/berthelot';
import { BmiPage } from '../bmi/bmi';
import { ChadsvascPage } from '../chadsvasc/chadsvasc';
import { AboutPage } from '../about/about';
import { HasbledPage } from '../hasbled/hasbled';
import { HcmsuddeathPage } from '../hcmsuddeath/hcmsuddeath';
import { BodysurfacePage } from '../bodysurface/bodysurface';
import { ClearancePage } from '../clearance/clearance';
import { QtintervalPage } from '../qtinterval/qtinterval';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
    
    pages: Array<{title: string, component: any}>;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Berthelot', component: BerthelotPage },
            { title: 'CHA2DS2-VASc', component: ChadsvascPage },
            { title: 'Clairance de la créatinine', component: ClearancePage },
            { title: 'HAS-BLED', component: HasbledPage },
            { title: 'HCM Risk-SCD', component: HcmsuddeathPage },
            { title: 'IMC', component: BmiPage },
            { title: 'QT corrigé', component: QtintervalPage },
            { title: 'Surface corporelle', component: BodysurfacePage },
            { title: 'A propos...', component: AboutPage }
        ];

    }
    
    openPage(page)
    {
        this.navCtrl.setRoot(page.component);
    }
}

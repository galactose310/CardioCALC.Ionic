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
import { WellsPage } from '../wells/wells';
import { GenevaPage } from '../geneva/geneva';
import { PesiPage } from '../pesi/pesi';
import { DukePage } from '../duke/duke';
import { StsPage } from '../sts/sts';
import { RightcathPage } from '../rightcath/rightcath';

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

    scores: Array<{title: string, component: any}>;
    calculs: Array<{title: string, component: any}>;
    aboutPage = { component: AboutPage }
    items: Array<string>;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        this.initializeItems();
    }

    openPage(page)
    {
        this.navCtrl.setRoot(page.component);
    }

    initializeItems(): void
    {
        // used for an example of ngFor and navigation
        this.scores = [
            { title: 'CHA2DS2-VASc', component: ChadsvascPage },
            { title: 'Genève', component: GenevaPage },
            { title: 'HAS-BLED', component: HasbledPage },
            { title: 'HCM Risk-SCD', component: HcmsuddeathPage },
            { title: 'PESI', component: PesiPage },
            { title: 'PH-HFpEF Group', component: BerthelotPage },
            { title: 'STS', component: StsPage },
            { title: 'Wells', component: WellsPage }
        ];
        this.calculs = [
            { title: 'Clairance de la créatinine', component: ClearancePage },
            { title: 'Critères de Duke', component: DukePage },
            { title: 'Hémodynamique', component: RightcathPage },
            { title: 'IMC', component: BmiPage },
            { title: 'QT corrigé', component: QtintervalPage },
            { title: 'Surface corporelle', component: BodysurfacePage }
        ];
    }

    getItems(ev): void
    {
        // Reset items back to all of the items
        this.initializeItems();

        // if the value is an empty string don't filter the items
        if (ev.target.value && ev.target.value.trim() != '')
        {
            this.scores = this.scores.filter((score) => {
            return (score.title.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
            })
            this.calculs = this.calculs.filter((calcul) => {
            return (calcul.title.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
            })
        }
    }
}

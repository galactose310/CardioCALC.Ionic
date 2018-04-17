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
import { ConvertPage } from '../convert/convert';
import { HemorrhagesPage } from '../hemorrhages/hemorrhages';
import { FeureaPage } from '../feurea/feurea';
import { AmyloidosisPage } from '../amyloidosis/amyloidosis';
import { TachycardiaPage } from '../tachycardia/tachycardia';
import { QualifyPage } from '../qualify/qualify';
import { DiastolePage } from '../diastole/diastole';
import { ConstrictionPage } from '../constriction/constriction';
import { PhdiagnosisPage } from '../phdiagnosis/phdiagnosis';
import { SyncopePage } from '../syncope/syncope';

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
	
	rythmology_scores: Array<{title: string, component: any}>;
    heartFailure_scores: Array<{title: string, component: any}>;
    surgery_scores: Array<{title: string, component: any}>;
    embolism_scores: Array<{title: string, component: any}>;
    infection_scores: Array<{title: string, component: any}>;
    calculs: Array<{title: string, component: any}>;
    aboutPage = { component: AboutPage }
    items: Array<string>;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        this.initializeItems();
    }

    openPage(page)
    {
        this.navCtrl.push(page.component);
    }

    initializeItems(): void
    {
        // used for an example of ngFor and navigation
		this.rythmology_scores = [
			{ title: 'Canadian Syncope Risk', component: SyncopePage },
			{ title: 'CHA2DS2-VASc', component: ChadsvascPage },
            { title: 'HAS-BLED', component: HasbledPage },
            { title: 'HCM Risk-SCD', component: HcmsuddeathPage },
			{ title: 'HEMORR2HAGES', component: HemorrhagesPage },
            { title: 'QT corrigé', component: QtintervalPage },
			{ title: 'Ventricular Tachycardia', component: TachycardiaPage }
		];
        this.heartFailure_scores = [
            { title: 'Amylose cardiaque', component: AmyloidosisPage },
			{ title: 'Constriction / Restriction', component: ConstrictionPage },
			{ title: 'Fonction diastolique', component: DiastolePage },
            { title: 'Hémodynamique', component: RightcathPage },
            { title: 'PH-HFpEF Group', component: BerthelotPage },
			{ title: 'Probabilité d\'HTAP', component: PhdiagnosisPage },
			{ title: 'QUALIFY', component: QualifyPage }
        ];
        this.surgery_scores = [
            { title: 'STS', component: StsPage }
        ];
        this.embolism_scores = [
            { title: 'Genève', component: GenevaPage },
            { title: 'PESI', component: PesiPage },
            { title: 'Wells', component: WellsPage }
        ];
        this.infection_scores = [
			{ title: 'Critères de Duke', component: DukePage }
        ];
        this.calculs = [
            { title: 'Clairance de la créatinine', component: ClearancePage },
  		  	{ title: 'Conversions d\'unités', component: ConvertPage },
            { title: 'Fraction d\'excrétion urée', component: FeureaPage },
            { title: 'IMC & Poids idéal', component: BmiPage },
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
            this.rythmology_scores = this.rythmology_scores.filter((rythmology_score) => {
            return (rythmology_score.title.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
            })
            this.heartFailure_scores = this.heartFailure_scores.filter((heartFailure_score) => {
            return (heartFailure_score.title.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
            })
            this.surgery_scores = this.surgery_scores.filter((surgery_score) => {
            return (surgery_score.title.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
            })
            this.embolism_scores = this.embolism_scores.filter((embolism_score) => {
            return (embolism_score.title.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
            })
            this.infection_scores = this.infection_scores.filter((infection_score) => {
            return (infection_score.title.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
            })
            this.calculs = this.calculs.filter((calcul) => {
            return (calcul.title.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
            })
        }
    }
}

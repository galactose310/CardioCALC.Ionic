import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ConditionsPage } from '../pages/conditions/conditions';
import { HomePage } from '../pages/home/home';
import { BerthelotPage } from '../pages/berthelot/berthelot';
import { BmiPage } from '../pages/bmi/bmi';
import { ChadsvascPage } from '../pages/chadsvasc/chadsvasc';
import { AboutPage } from '../pages/about/about';
import { HasbledPage } from '../pages/hasbled/hasbled';
import { HcmsuddeathPage } from '../pages/hcmsuddeath/hcmsuddeath';
import { BodysurfacePage } from '../pages/bodysurface/bodysurface';
import { ClearancePage } from '../pages/clearance/clearance';
import { QtintervalPage } from '../pages/qtinterval/qtinterval';
import { WellsPage } from '../pages/wells/wells';
import { GenevaPage } from '../pages/geneva/geneva';
import { PesiPage } from '../pages/pesi/pesi';
import { DukePage } from '../pages/duke/duke';
import { StsPage } from '../pages/sts/sts';
import { RightcathPage } from '../pages/rightcath/rightcath';
import { ConvertPage } from '../pages/convert/convert';
import { HemorrhagesPage } from '../pages/hemorrhages/hemorrhages';
import { FeureaPage } from '../pages/feurea/feurea';
import { AmyloidosisPage } from '../pages/amyloidosis/amyloidosis';
import { TachycardiaPage } from '../pages/tachycardia/tachycardia';
import { QualifyPage } from '../pages/qualify/qualify';
import { DiastolePage } from '../pages/diastole/diastole';
import { ConstrictionPage } from '../pages/constriction/constriction';
import { PhdiagnosisPage } from '../pages/phdiagnosis/phdiagnosis';
import { SyncopePage } from '../pages/syncope/syncope';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
	
	@ViewChild(Nav) nav: Nav;

	rootPage: any = HomePage;
	
	rythmology_scores: Array<{title: string, component: any}>;
    heartFailure_scores: Array<{title: string, component: any}>;
    surgery_scores: Array<{title: string, component: any}>;
    embolism_scores: Array<{title: string, component: any}>;
    infection_scores: Array<{title: string, component: any}>;
	calculs: Array<{title: string, component: any}>;
	aboutPage = { title: "about", component: AboutPage };

	constructor(public platform: Platform, public SplashScreen: SplashScreen, public StatusBar: StatusBar)
	{
		if (JSON.parse(localStorage.getItem("first_version_conditions_accepted")) != "true") this.rootPage = ConditionsPage;
		
		this.initializeApp();
		
		// used for an example of ngFor and navigation
		this.initializeItems();
	}

	initializeApp()
	{
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.StatusBar.styleDefault();
			this.SplashScreen.hide();
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.push(page.component);
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

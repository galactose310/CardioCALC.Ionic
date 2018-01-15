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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  
  scores: Array<{title: string, component: any}>;
  calculs: Array<{title: string, component: any}>;
  aboutPage = { title: "about", component: AboutPage };

  constructor(public platform: Platform, public SplashScreen: SplashScreen, public StatusBar: StatusBar) {
    
    (JSON.parse(localStorage.getItem("first_version_conditions_accepted")) != "true") ? this.rootPage = ConditionsPage : this.rootPage = HomePage;
    
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.initializeItems();
    
  }

  initializeApp() {
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
    this.nav.setRoot(page.component);
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
          { title: 'Wells', component: WellsPage }
      ];
      this.calculs = [
          { title: 'Clairance de la créatinine', component: ClearancePage },
          { title: 'Critères de Duke', component: DukePage },
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

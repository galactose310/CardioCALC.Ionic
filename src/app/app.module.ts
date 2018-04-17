import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { ConditionsPage } from '../pages/conditions/conditions';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { BerthelotPage } from '../pages/berthelot/berthelot';
import { BmiPage } from '../pages/bmi/bmi';
import { ChadsvascPage } from '../pages/chadsvasc/chadsvasc';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ConditionsPage,
    HomePage,
    BerthelotPage,
    HcmsuddeathPage,
    BmiPage,
    ChadsvascPage,
    HasbledPage,
    BodysurfacePage,
    ClearancePage,
    QtintervalPage,
    WellsPage,
    GenevaPage,
    PesiPage,
    DukePage,
    StsPage,
    RightcathPage,
    AboutPage,
	ConvertPage,
	HemorrhagesPage,
	FeureaPage,
	AmyloidosisPage,
	TachycardiaPage,
	QualifyPage,
	DiastolePage,
	ConstrictionPage,
	PhdiagnosisPage,
	SyncopePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConditionsPage,
    HomePage,
    BerthelotPage,
    HcmsuddeathPage,
    BmiPage,
    ChadsvascPage,
    HasbledPage,
    BodysurfacePage,
    ClearancePage,
    QtintervalPage,
    WellsPage,
    GenevaPage,
    PesiPage,
    DukePage,
    StsPage,
    RightcathPage,
    AboutPage,
	ConvertPage,
	HemorrhagesPage,
	FeureaPage,
	AmyloidosisPage,
	TachycardiaPage,
	QualifyPage,
	DiastolePage,
	ConstrictionPage,
	PhdiagnosisPage,
	SyncopePage
  ],
  providers: [
      SplashScreen,
      StatusBar,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

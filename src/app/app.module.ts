import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BerthelotPage,
    HcmsuddeathPage,
    BmiPage,
    ChadsvascPage,
    HasbledPage,
    BodysurfacePage,
    ClearancePage,
    QtintervalPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BerthelotPage,
    HcmsuddeathPage,
    BmiPage,
    ChadsvascPage,
    HasbledPage,
    BodysurfacePage,
    ClearancePage,
    QtintervalPage,
    AboutPage
  ],
  providers: [
      SplashScreen,
      StatusBar,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/*
  Generated class for the WellsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wells',
  templateUrl: 'wells.html',
})

export class WellsPage extends Score {
    
    previousPE: number = 0;
    heartRateOver100: number = 0;
    surgery: number = 0;
    haemoptysis: number = 0;
    cancer: number = 0;
    clinicalDVT: number = 0;
    alternativeDiag: number = 3;
    
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
        this.set_score_name("Score de Wells");
        
        this.helpItems = [
            {item: "previousPE", title: "Antécédent d'EP / TVP", desc: "EP : embolie pulmonaire. TVP : thrombose veineuse profonde."},
            {item: "surgery", title: "Chirurgie / immobilisation", desc: "Chirurgie ou immobilisation prolongée dans les 4 dernières semaines."},
            {item: "cancer", title: "Cancer évolutif", desc: "Néoplasie active ou en rémission depuis moins d'un an."},
            {item: "clinicalDVT", title: "Signes cliniques de TVP", desc: "TVP : thrombose veineuse profonde."},
            {item: "alternativeDiag", title: "Diagnostic alternatif", desc: "Un diagnostic alternatif est au moins aussi probable que l'embolie pulmonaire."}
        ];
    }
    
    // Change value if toggled
    previousPE_toggle (): void
    {
        (this.previousPE == 0) ? this.previousPE = 1.5 : this.previousPE = 0;
    }
    
    // Change value if toggled
    heartrate_toggle (): void
    {
        (this.heartRateOver100 == 0) ? this.heartRateOver100 = 1.5 : this.heartRateOver100 = 0;
    }
    
    // Change value if toggled
    surgery_toggle (): void
    {
        (this.surgery == 0) ? this.surgery = 1.5 : this.surgery = 0;
    }
    
    // Change value if toggled
    haemoptysis_toggle (): void
    {
        (this.haemoptysis == 0) ? this.haemoptysis = 1 : this.haemoptysis = 0;
    }
    
    // Change value if toggled
    cancer_toggle (): void
    {
        (this.cancer == 0) ? this.cancer = 1 : this.cancer = 0;
    }
    
    // Change value if toggled
    clinicalDVT_toggle (): void
    {
        (this.clinicalDVT == 0) ? this.clinicalDVT = 3 : this.clinicalDVT = 0;
    }
    
    // Change value if toggled
    alternative_toggle (): void
    {
        (this.alternativeDiag == 0) ? this.alternativeDiag = 3 : this.alternativeDiag = 0;
    }
    
    // Calculate the score
    calculate (): void
    {
        this.set_score_result (this.previousPE + this.heartRateOver100 + this.surgery + this.haemoptysis + this.cancer + this.clinicalDVT + this.alternativeDiag);
    }
    
    // Display score result after calculating it
    display (): void
    {
        // First calculate the score
        this.calculate();
        
        // Then define message to display according the score value
        if (this.scoreResult < 2) this.set_interpretation("Probabilité clinique d'embolie pulmonaire <strong>faible</strong>. Le dosage des D-dimères est recommandé.");
        else if (this.scoreResult > 6) this.set_interpretation("Probabilité clinique d'embolie pulmonaire <strong>élevée</strong>. La réalisation d'un angioscanner thoracique est recommandée, sans dosage des D-dimères.");
        else this.set_interpretation("Probabilité clinique d'embolie pulmonaire <strong>intermédiaire</strong>. Le dosage des D-dimères est recommandé.");
        
        // Display score result
        super.display();
    }
    
}

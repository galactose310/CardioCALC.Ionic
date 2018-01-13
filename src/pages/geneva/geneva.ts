import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/*
  Generated class for the GenevaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-geneva',
  templateUrl: 'geneva.html',
})

export class GenevaPage extends Score {
    
    previousPE: number = 0;
    heartRateOver75: number = 0;
    heartRateOver95: number = 0;
    surgery: number = 0;
    haemoptysis: number = 0;
    cancer: number = 0;
    limbPain: number = 0;
    oedema: number = 0;
    ageOver65: number = 0;
    
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
        this.set_score_name("Score de Genève");
        
        this.helpItems = [
            {item: "previousPE", title: "Antécédent d'EP / TVP", desc: "EP : embolie pulmonaire. TVP : thrombose veineuse profonde."},
            {item: "surgery", title: "Chirurgie / immobilisation", desc: "Chirurgie, fracture ou immobilisation prolongée dans les 4 dernières semaines."},
            {item: "cancer", title: "Cancer évolutif", desc: "Néoplasie active ou en rémission depuis moins d'un an."},
            {item: "limbPain", title: "Douleur d'un mollet", desc: "Douleur unilatérale spontanée d'un mollet."},
            {item: "oedema", title: "Odème douloureux", desc: "Oedème unilatéral d'un mollet avec douleur à la palpation."}
        ];
    }
    
    // Change value if toggled
    previousPE_toggle (): void
    {
        (this.previousPE == 0) ? this.previousPE = 3 : this.previousPE = 0;
    }
    
    // Change value if toggled
    heartrate75_toggle (): void
    {
        (this.heartRateOver75 == 0) ? this.heartRateOver75 = 3 : this.heartRateOver75 = 0;
    }
    
    // Change value if toggled
    heartrate95_toggle (): void
    {
        (this.heartRateOver95 == 0) ? this.heartRateOver95 = 5 : this.heartRateOver95 = 0;
    }
    
    // Change value if toggled
    surgery_toggle (): void
    {
        (this.surgery == 0) ? this.surgery = 2 : this.surgery = 0;
    }
    
    // Change value if toggled
    haemoptysis_toggle (): void
    {
        (this.haemoptysis == 0) ? this.haemoptysis = 2 : this.haemoptysis = 0;
    }
    
    // Change value if toggled
    cancer_toggle (): void
    {
        (this.cancer == 0) ? this.cancer = 2 : this.cancer = 0;
    }
    
    // Change value if toggled
    limbPain_toggle (): void
    {
        (this.limbPain == 0) ? this.limbPain = 3 : this.limbPain = 0;
    }
    
    // Change value if toggled
    oedema_toggle (): void
    {
        (this.oedema == 0) ? this.oedema = 4 : this.oedema = 0;
    }
    
    // Change value if toggled
    age65_toggle (): void
    {
        (this.ageOver65 == 0) ? this.ageOver65 = 1 : this.ageOver65 = 0;
    }
    
    // Calculate the score
    calculate (): void
    {
        let tmp = this.previousPE + this.heartRateOver75 + this.heartRateOver95 + this.surgery + this.haemoptysis + this.cancer + this.limbPain + this.oedema + this.ageOver65;
        if (this.heartRateOver75 != 0 && this.heartRateOver95 !=0) tmp -= this.heartRateOver75;
        
        this.set_score_result (tmp);
    }
    
    // Display score result after calculating it
    display (): void
    {
        // First calculate the score
        this.calculate();
        
        // Then define message to display according the score value
        if (this.scoreResult < 4) this.set_interpretation("Probabilité clinique d'embolie pulmonaire <strong>faible</strong>. Le dosage des D-dimères est recommandé.");
        else if (this.scoreResult > 10) this.set_interpretation("Probabilité clinique d'embolie pulmonaire <strong>élevée</strong>. La réalisation d'un angioscanner thoracique est recommandée, sans dosage des D-dimères.");
        else this.set_interpretation("Probabilité clinique d'embolie pulmonaire <strong>intermédiaire</strong>. Le dosage des D-dimères est recommandé.");
        
        // Display score result
        super.display();
    }
    
}

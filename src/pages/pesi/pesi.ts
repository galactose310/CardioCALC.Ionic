import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the PesiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pesi',
  templateUrl: 'pesi.html',
})

export class PesiPage extends Score {
    
    age: number = null;
    sexMale: number = 0;
    cancer: number = 0;
    heartFailure: number = 0;
    respFailure: number = 0;
    tachycardia: number = 0;
    hypotension: number = 0;
    tachypnea: number = 0;
    hypothermia: number = 0;
    conscious: number = 0;
    desaturation: number = 0;
    
    constructor(public alertCtrl: AlertController)
    {
        super(alertCtrl);
        this.set_score_name("Score PESI");
        
        this.helpItems = [
            {item: "cancer", title: "Cancer", desc: "Antécédant de cancer ou cancer évolutif."},
            {item: "hypotension", title: "Hypotension < 100 mmHg", desc: "Pression artérielle systolique < 100 mmHg."},
            {item: "conscious", title: "Conscience altérée", desc: "Désorientation, léthargie, stupeur, coma."},
            {item: "desaturation", title: "Désaturation < 90 %", desc: "Avec ou sans oxygène."}
        ];
    }
    
    // Change value if toggled
    sexmale_toggle (): void
    {
        (this.sexMale == 0) ? this.sexMale = 10 : this.sexMale = 0;
    }
    
    // Change value if toggled
    cancer_toggle (): void
    {
        (this.cancer == 0) ? this.cancer = 30 : this.cancer = 0;
    }
    
    // Change value if toggled
    heartfailure_toggle (): void
    {
        (this.heartFailure == 0) ? this.heartFailure = 10 : this.heartFailure = 0;
    }
    
    // Change value if toggled
    respfailure_toggle (): void
    {
        (this.respFailure == 0) ? this.respFailure = 10 : this.respFailure = 0;
    }
    
    // Change value if toggled
    tachycardia_toggle (): void
    {
        (this.tachycardia == 0) ? this.tachycardia = 20 : this.tachycardia = 0;
    }
    
    // Change value if toggled
    hypotension_toggle (): void
    {
        (this.hypotension == 0) ? this.hypotension = 30 : this.hypotension = 0;
    }
    
    // Change value if toggled
    tachypnea_toggle (): void
    {
        (this.tachypnea == 0) ? this.tachypnea = 20 : this.tachypnea = 0;
    }
    
    // Change value if toggled
    hypothermia_toggle (): void
    {
        (this.hypothermia == 0) ? this.hypothermia = 20 : this.hypothermia = 0;
    }
    
    // Change value if toggled
    conscious_toggle (): void
    {
        (this.conscious == 0) ? this.conscious = 60 : this.conscious = 0;
    }
    
    // Change value if toggled
    desaturation_toggle (): void
    {
        (this.desaturation == 0) ? this.desaturation = 20 : this.desaturation = 0;
    }
    
    // Calculate the score
    calculate (): boolean
    {
        // First check if all input data are valid
        this.dataToValidate = [this.age];
        
        if (this.validate_data())
        {
            // If yes, calculate the score and return true
            this.set_score_result (Number(this.age) + this.sexMale + this.cancer + this.heartFailure + this.respFailure + this.tachycardia + this.hypotension + this.tachypnea + this.hypothermia + this.conscious + this.desaturation);
            return true;
        }
        else return false;
    }
    
    // Display score result after calculating it
    display (): void
    {
        // First calculate the score (checks if data are valid)
        if (this.calculate())
        {
            // Then define message to display according the score value
            if (this.scoreResult <= 65) this.set_interpretation("<strong>Risque faible</strong>. Classe I (mortalité à 30 jours : 0 - 1.6 %).");
            else if (this.scoreResult > 65 && this.scoreResult <= 85) this.set_interpretation("<strong>Risque faible</strong>. Classe II (mortalité à 30 jours : 1.7 - 3.5 %).");
            else if (this.scoreResult > 85 && this.scoreResult <= 105) this.set_interpretation("<strong>Risque intermédiaire</strong>. Classe III (mortalité à 30 jours : 3.2 - 7.1 %). Pratiquer l'évaluation de la fonction ventriculaire droite et les tests biologiques.");
            else if (this.scoreResult > 105 && this.scoreResult <= 125) this.set_interpretation("<strong>Risque intermédiaire</strong>. Classe IV (mortalité à 30 jours : 4.0 - 11.4 %). Pratiquer l'évaluation de la fonction ventriculaire droite et les tests biologiques.");
            else this.set_interpretation("<strong>Risque élevé</strong>. Classe V (mortalité à 30 jours : 10.0 - 24.5 %).");
            
            // Display score result
            super.display();
        }
    }
    
}

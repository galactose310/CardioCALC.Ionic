import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the HasbledPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hasbled',
  templateUrl: 'hasbled.html',
})

export class HasbledPage extends Score {
    
    hypertension: number = 0;
    renalFailure: number = 0;
    hepaticFailure: number = 0;
    stroke: number = 0;
    bleeding: number = 0;
    labileINR: number = 0;
    ageOver65: number = 0;
    drugs: number = 0;
    alcohol: number = 0;
    riskRate: string = null;
    
    constructor(public alertCtrl: AlertController)
    {
        super(alertCtrl);
        this.set_score_name("Score HAS-BLED");
    }
    
    // Change value if toggled
    htens_toggle (): void
    {
        (this.hypertension == 0) ? this.hypertension = 1 : this.hypertension = 0;
    }
    
    // Change diabetes value if toggled
    renal_toggle (): void
    {
        (this.renalFailure == 0) ? this.renalFailure = 1 : this.renalFailure = 0;
    }
    
    // Change value if toggled
    hepatic_toggle (): void
    {
        (this.hepaticFailure == 0) ? this.hepaticFailure = 1 : this.hepaticFailure = 0;
    }
    
    // Change value if toggled
    stroke_toggle (): void
    {
        (this.stroke == 0) ? this.stroke = 1 : this.stroke = 0;
    }
    
    // Change value if toggled
    bleeding_toggle (): void
    {
        (this.bleeding == 0) ? this.bleeding = 1 : this.bleeding = 0;
    }
    
    // Change value if toggled
    INR_toggle (): void
    {
        (this.labileINR == 0) ? this.labileINR = 1 : this.labileINR = 0;
    }
    
    // Change value if toggled
    age65_toggle (): void
    {
        (this.ageOver65 == 0) ? this.ageOver65 = 1 : this.ageOver65 = 0;
    }
    
    // Change value if toggled
    drugs_toggle (): void
    {
        (this.drugs == 0) ? this.drugs = 1 : this.drugs = 0;
    }
    
    // Change value if toggled
    alcohol_toggle (): void
    {
        (this.alcohol == 0) ? this.alcohol = 1 : this.alcohol = 0;
    }
    
    // Calculate the score
    calculate (): void
    {
        this.set_score_result(this.hypertension + this.renalFailure + this.hepaticFailure + this.stroke + this.bleeding + this.labileINR
                    + this.ageOver65 + this.drugs + this.alcohol);
    }
    
    // Display score result after calculating it
    display (): void
    {
        // First calculate the score
        this.calculate();
        
        // Then define message to display according the score value
        switch (this.scoreResult)
        {
            case 0:
                this.riskRate = "0.9";
                break;
            case 1:
                this.riskRate = "3.4";
                break;
            case 2:
                this.riskRate = "4.1";
                break;
            case 3:
                this.riskRate = "5.8";
                break;
            case 4:
                this.riskRate = "8.9";
                break;
            case 5:
                this.riskRate = "9.1";
                break;
            case 6: case 7: case 8: case 9:
                this.riskRate = "> 12";
                break;
            default:
                this.riskRate = null;
                break;
        }
        
        // Set interpretation message to display with score result
        this.set_interpretation('Risque hémorragique : ' + this.riskRate + ' % (risque estimé sous Warfarine, durée moyenne de traitement : 500 jours).'),
        
        // Display score result
        super.display();
    }
    
}

import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Score } from '../generic/generic';

/*
  Generated class for the ChadsvascPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wells',
  templateUrl: 'wells.html',
})

export class WellsPage extends Score {
    
    heartFailure: number = 0;
    hypertension: number = 0;
    ageOver65: number = 0;
    diabetes: number = 0;
    stroke: number = 0;
    vascular: number = 0;
    ageOver75: number = 0;
    female: number = 0;
    riskRate: number = 0;
    
    constructor(public alertCtrl: AlertController)
    {
        super(alertCtrl);
        this.set_score_name("Score CHA2DS2-VASc");
        
        this.helpItems.push({item: "HTA", title: "HTA", desc :"HTA non contrôlée"});
    }
    
    // Change value if toggled
    hfail_toggle (): void
    {
        (this.heartFailure == 0) ? this.heartFailure = 1 : this.heartFailure = 0;
    }
    
    // Change value if toggled
    htens_toggle (): void
    {
        (this.hypertension == 0) ? this.hypertension = 1 : this.hypertension = 0;
    }
    
    // Change value if toggled
    age65_toggle (): void
    {
        (this.ageOver65 == 0) ? this.ageOver65 = 1 : this.ageOver65 = 0;
    }
    
    // Change diabetes value if toggled
    diabetes_toggle (): void
    {
        (this.diabetes == 0) ? this.diabetes = 1 : this.diabetes = 0;
    }
    
    // Change value if toggled
    stroke_toggle (): void
    {
        (this.stroke == 0) ? this.stroke = 1 : this.stroke = 0;
    }
    
    // Change value if toggled
    vascular_toggle (): void
    {
        (this.vascular == 0) ? this.vascular = 1 : this.vascular = 0;
    }
    
    // Change value if toggled
    age75_toggle (): void
    {
        (this.ageOver75 == 0) ? this.ageOver75 = 1 : this.ageOver75 = 0;
    }
    
    // Change value if toggled
    female_toggle (): void
    {
        (this.female == 0) ? this.female = 1 : this.female = 0;
    }
    
    // Calculate the score
    calculate (): void
    {
        this.set_score_result (this.heartFailure + this.hypertension + this.ageOver65 + this.diabetes + (2 * this.stroke)
                + this.vascular + this.ageOver75 + this.female);
        if (this.ageOver75 == 1 && this.ageOver65 == 0) this.set_score_result(this.scoreResult + 1);
        if (this.scoreResult == 1 && this.female == 1) this.set_score_result(0);
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
                this.riskRate = 0;
                break;
            case 1:
                this.riskRate = 1.3;
                break;
            case 2:
                this.riskRate = 2.2;
                break;
            case 3:
                this.riskRate = 3.2;
                break;
            case 4:
                this.riskRate = 4.0;
                break;
            case 5:
                this.riskRate = 6.7;
                break;
            case 6:
                this.riskRate = 9.8;
                break;
            case 7:
                this.riskRate = 9.6;
                break;
            case 8:
                this.riskRate = 12.5;
                break;
            case 9:
                this.riskRate = 15.2;
                break;
            default:
                this.riskRate = 0;
                break;
        }
        
        // Set interpretation message to display with score result
        this.set_interpretation("Risque thrombo-embolique : " + this.riskRate + " % par an.");
        
        // Display score result
        super.display();
    }
    
}

import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/*
  Generated class for the ChadsvascPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chadsvasc',
  templateUrl: 'chadsvasc.html',
})

export class ChadsvascPage extends Score {
    
    heartFailure: boolean = false;
    hypertension: boolean = false;
    ageOver65: boolean = false;
    diabetes: boolean = false;
    stroke: boolean = false;
    vascular: boolean = false;
    ageOver75: boolean = false;
    female: boolean = false;
    riskRate: number = 0;
    
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
        this.set_score_name("Score CHA<sub>2</sub>DS<sub>2</sub>-VASc");
        
        this.helpItems = [
                {item: "heartFailure", title: "Insuffisance cardiaque", desc: "Antécédent d'insuffisance cardiaque congestive ou FEVG < 45 %."}
            ];
    }
    
	// Toggle age65 if age75 if true
	age75_toggle(): void
	{
		if (this.ageOver75) this.ageOver65 = true;
	}
    
	// Toggle age75 if age65 if false
	age65_toggle(): void
	{
		if (!this.ageOver65) this.ageOver75 = false;
	}
	
    // Calculate the score
    calculate (): void
    {
		// this.stroke twice to count for 2 points
		this.dataToCount = [this.heartFailure, this.hypertension, this.ageOver65, this.diabetes, this.stroke, this.stroke, this.vascular, this.ageOver75, this.female];
		
		this.set_score_result(this.count_true());

		if (this.ageOver75 && !this.ageOver65) this.set_score_result(this.scoreResult + 1);
        if (this.scoreResult == 1 && this.female) this.set_score_result(0);
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

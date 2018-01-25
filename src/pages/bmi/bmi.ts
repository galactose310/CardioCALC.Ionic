import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/*
  Generated class for the BmiPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bmi',
  templateUrl: 'bmi.html'
})

export class BmiPage extends Score {
    
	sexFemale: boolean = false;
    weight: number = null;
    height: number = null;
    
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
    }
    
    // Calculate the score according to values entered by user
    calculate (): boolean
    {
        // First we verify validity of sent data ==> do not calculate if unvalid
        this.dataToValidate = [this.height];
        if (this.validate_data())
        {
			this.dataToValidate = [this.weight];
			if (!this.validate_data(false))
			{
				this.set_score_name("Poids idéal (kg)");
				this.set_score_result(this.ideal_weight());
				(this.sexFemale) ? this.set_interpretation("Formule de Robinson pour les femmes.")
								: this.set_interpretation("Formule de Devine pour les hommes.");
				return true;
			}
			else
			{
        		this.set_score_name("IMC (kg/m²)");
            	this.set_score_result(this.bmi());
				if (this.scoreResult < 16) this.set_interpretation("Maigreur extrême");
				else if (this.scoreResult < 18.5) this.set_interpretation("Maigreur");
				else if(this.scoreResult > 40) this.set_interpretation("Obésité mordide (grade 3)");
				else if(this.scoreResult > 35) this.set_interpretation("Obésité sévère (grade 2)");
				else if(this.scoreResult > 30) this.set_interpretation("Obésité modérée (grade 1)");
				else if(this.scoreResult > 25) this.set_interpretation("Surpoids");
				else this.set_interpretation("IMC normal");
				
				this.set_interpretation(this.scoreInterpretation + " - <strong>Poids idéal</strong> : " + this.ideal_weight() + " kg ");
				(this.sexFemale) ? this.set_interpretation(this.scoreInterpretation + "(formule de Robinson pour les femmes).")
								: this.set_interpretation(this.scoreInterpretation + "(formule de Devine pour les hommes).");
            	return true;
			}
        }
        else return false;
    }
    
    // Display score result when asked by user
    display (): void
    {
        // Calculate the score and display result only if has been well calculated
        if (this.calculate())
        {
            // Display score result
            super.display();
        }
    }
    
	// Ideal weight formula
	ideal_weight(): number
	{
		if (!this.sexFemale) return Math.round(50 + 2.3 * (this.convert_height() - 60)); // Devine formula for men
		else return Math.round(49 + 1.7 * (this.convert_height() - 60)); // Robinson formula for women
	}
	
	// BMI formula
	bmi(): number
	{
		return Math.round(10 * this.weight / Math.pow(this.height / 100, 2)) / 10;
	}
	
	// Convert cm in inch
	convert_height(): number
	{
		return this.height / 2.54;
	}
}

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
    
    weight: number = null;
    height: number = null;
    
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
        this.set_score_name("IMC (kg/m²)");
    }
    
    // Calculate the score according to values entered by user
    calculate (): boolean
    {    
        // First we verify validity of sent data ==> do not calculate if unvalid
        this.dataToValidate = [this.weight, this.height];
        if (this.validate_data())
        {
            this.set_score_result(Math.round(10 * this.weight / Math.pow(this.height / 100, 2)) / 10);
            return true;
        }
        else return false;
    }
    
    // Display score result when asked by user
    display (): void
    {
        // Calculate the score and display result only if has been well calculated
        if (this.calculate())
        {
            if (this.scoreResult < 16) this.set_interpretation("Maigreur extrême.");
            else if (this.scoreResult < 18.5) this.set_interpretation("Maigreur.");
            else if(this.scoreResult > 40) this.set_interpretation("Obésité mordide (grade 3).");
            else if(this.scoreResult > 35) this.set_interpretation("Obésité sévère (grade 2).");
            else if(this.scoreResult > 30) this.set_interpretation("Obésité modérée (grade 1).");
            else if(this.scoreResult > 25) this.set_interpretation("Surpoids.");
            else this.set_interpretation("IMC normal.");
            
            // Display score result
            super.display();
        }
    }
    
}

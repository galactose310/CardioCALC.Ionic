import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the BodysurfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bodysurface',
  templateUrl: 'bodysurface.html',
})

export class BodysurfacePage extends Score {

    weight: number = null;
    height: number = null;
	valueToIndex: number = null;

    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
        this.set_score_name("Surface corporelle (m²)");
    }

    // Give formula for external use
    public bodysurface_formula(weight: number = this.weight, height: number = this.height): number
    {
      return Math.round(1000 * 0.0003207 * Math.pow(weight*1000, (0.7285-(0.0188*Math.log10(weight*1000)))) * Math.pow(height, 0.3)) / 1000;
    }
	
    // Calculate the score according to values entered by user
    calculate (): boolean
    {
        // First we verify validity of sent data ==> do not calculate if unvalid
        this.dataToValidate = [this.weight, this.height];
        if (this.validate_data())
        {
            this.set_score_result(this.bodysurface_formula());
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
			// Calculate value to index if needed
			if (this.valueToIndex != null) this.set_interpretation(Math.round(100 * this.valueToIndex / this.scoreResult)/100 + " unité/m².");
			
            // Display score result
            super.display();
        }
    }
}

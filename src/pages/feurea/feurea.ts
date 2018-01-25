import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the FeureaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feurea',
  templateUrl: 'feurea.html',
})

export class FeureaPage extends Score {
	
	ureaPlasma: number = null;
	ureaUrine: number = null;
	creatininePlasma: number = null;
	creatinineUrine: number = null;
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);

		this.set_score_name("FE urée (%)");
	}
	
	// Calculate the score according to values entered by user
	calculate (): boolean
	{
		// Array with values to validate according to what is needed for the score
		this.dataToValidate = [this.ureaPlasma, this.ureaUrine, this.creatinineUrine, this.creatininePlasma];

		// First we verify validity of sent data ==> do not calculate if unvalid
		if (this.validate_data())
		{
			this.set_score_result(Math.round(10 * 100 * (this.ureaUrine * this.creatininePlasma) / (this.ureaPlasma * this.creatinineUrine)) / 10);
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
			// Set interpretation message to display with score result
			if (this.scoreResult < 35) this.set_interpretation("Insuffisance rénale probablement fonctionnelle (pré-rénale).");
			else if (this.scoreResult > 50) this.set_interpretation("Insuffisance rénale probablement organique (rénale) ou obstructive (post-rénale).");
			else this.set_interpretation("Insuffisance rénale plutôt organique ou obstructive. Néanmoins entre 35 et 50%, la fraction d'excrétion de l'urée manque de spécificité.");
			
			// Display score result
			super.display();
		}
	}
}

import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the AmyloidosisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-amyloidosis',
  templateUrl: 'amyloidosis.html',
})

export class AmyloidosisPage extends Score {
	
	pressure: boolean = false;
	prInterval: boolean = false;
	sokolow: boolean = false;
	lvwall: boolean = false;
	eeDoppler: boolean = false;
	globalStrain: boolean = false;
	basalStrain: boolean = false;
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);

		this.set_score_name("Score amylose");
		
		this.helpItems = [
			{ item : "lvwall", title: "Paroi post. VG", desc: "Epaisseur de la paroi postérieure du ventricule gauche (en télédiastole)." },
			{ item : "basalStrain", title: "Somme du SBL", desc: "Somme des valeurs du stain basal longitudinal (valeurs négatives)." }
		];
	}
	
	// Calculate the score according to values entered by user
	calculate (): void
	{
		this.dataToCount = [this.pressure, this.prInterval, this.sokolow, this.lvwall, this.basalStrain, this.globalStrain, this.eeDoppler];
		this.set_score_result(this.count_true());
	}
	
	// Display score result when asked by user
	display (): void
	{
		// Calculate the score and display result only if has been well calculated
		this.calculate();
		
		// Set interpretation message to display with score result
		if (this.scoreResult > 5) this.set_interpretation("Très forte probabilité d'amylose cardiaque.");
		else if (this.scoreResult > 3) this.set_interpretation("Forte probabilité d'amylose cardiaque.");
		else this.set_interpretation("Faible probabilité d'amylose cardiaque (spécificité < 80 %).");
		
		// Display score result
		super.display();
	}
}

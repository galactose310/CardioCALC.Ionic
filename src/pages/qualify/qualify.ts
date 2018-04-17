import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the QualifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qualify',
  templateUrl: 'qualify.html',
})

export class QualifyPage extends Score {
	
	betablocker: boolean = false;
	betablockerMaxDose: boolean = false;
	betablockerReason: string = "none";
	
	acei: boolean = false;
	sacubitril: boolean = false;
	aceiMaxDose: boolean = false;
	aceiReason: string = "none";
	
	mra: boolean = false;
	mraMaxDose: boolean = false;
	mraReason: string = "none";
	
	ivabradine: boolean = false;
	ivabradineMaxDose: boolean = false;
	ivabradineReason: string = "none";
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);

		this.set_score_name("Score QUALIFY (%)");
	}
	
	// Cancel betablocker dose if set to not prescribed
	betablocker_toggle (): void
	{
		if (!this.betablocker) this.betablockerMaxDose = false;
	}
	
	// Change betablocker to true if dose is set to max
	betablockerMaxDose_toggle (): void
	{
		if (this.betablockerMaxDose) this.betablocker = true;
	}
	
	// Cancel ACEI dose if set to not prescribed
	acei_toggle (): void
	{
		if (!this.acei) this.aceiMaxDose = false;
	}
	
	// Change ACEI to true if dose is set to max
	aceiMaxDose_toggle (): void
	{
		if (this.aceiMaxDose) this.acei = true;
	}
	
	// Cancel MRA dose if set to not prescribed
	mra_toggle (): void
	{
		if (!this.mra) this.mraMaxDose = false;
	}
	
	// Change MRA to true if dose is set to max
	mraMaxDose_toggle (): void
	{
		if (this.mraMaxDose) this.mra = true;
	}
	
	// Cancel ivabradine dose if set to not prescribed
	ivabradine_toggle (): void
	{
		if (!this.ivabradine) this.ivabradineMaxDose = false;
	}
	
	// Change ivabradine to true if dose is set to max
	ivabradineMaxDose_toggle (): void
	{
		if (this.ivabradineMaxDose) this.ivabradine = true;
	}
	
	// Calculate the score according to values entered by user
	calculate (): void
	{
		let score: number = 0;
		if ((this.betablocker && this.betablockerMaxDose) || this.betablockerReason != "none") score++;
		if ((this.acei && this.aceiMaxDose) || this.aceiReason != "none") score++;
		if ((this.mra && this.mraMaxDose) || this.mraReason != "none") score++;
		if ((this.ivabradine && this.ivabradineMaxDose) || this.ivabradineReason != "none") score++;
		
		this.set_score_result(Math.round(100*score/4));
		
		// Set interpretation message to display with score result
		if (this.scoreResult == 100) this.set_interpretation("Adhésion au traitement <strong>optimale</strong>.");
		else
		{
			if (this.scoreResult > 50) this.set_interpretation("Adhésion au traitement <strong>moyenne</strong>.");
			else this.set_interpretation("Adhésion au traitement <strong>faible</strong>.");
			
			this.set_interpretation(this.scoreInterpretation + " Optimisations nécessaires :");
			if ((!this.betablocker || !this.betablockerMaxDose) && this.betablockerReason == "none")
				this.set_interpretation(this.scoreInterpretation + " bêta-bloquants,");
			if ((!this.acei || !this.aceiMaxDose) && this.aceiReason == "none")
				this.set_interpretation(this.scoreInterpretation + " IEC ou ARA2 ou sacubitril/valsartan,");
			if ((!this.mra || !this.mraMaxDose) && this.mraReason == "none")
				this.set_interpretation(this.scoreInterpretation + " anti-aldostérones,");
			if ((!this.ivabradine || !this.ivabradineMaxDose) && this.ivabradineReason == "none")
				this.set_interpretation(this.scoreInterpretation + " ivabradine,");
			
			this.set_interpretation(this.scoreInterpretation.substr(0, this.scoreInterpretation.length - 1) + ".");
		}
		if (this.acei && !this.sacubitril) this.set_interpretation(this.scoreInterpretation + " Considérez le remplacement des IEC/ARA2 par sacubitril/valsartan.");
	}
	
	// Display score result when asked by user
	display (): void
	{
		// Calculate the score and display result only if has been well calculated
		this.calculate();
		
		// Display score result
		super.display();
	}
}

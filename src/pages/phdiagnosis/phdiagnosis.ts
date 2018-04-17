import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the PhdiagnosisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-phdiagnosis',
  templateUrl: 'phdiagnosis.html',
})

export class PhdiagnosisPage extends Score {
	
	tricRegMeasured: boolean = true;
	tricRegVelocity: number = null;
	rvLargerThanLv: boolean = false;
	dshape: boolean = false;
	pvat: number = null;
	notch: boolean = false;
	pulmRegVelocity: number = null;
	pulmArtDiameter: number = null;
	dilatedVenaCava: boolean = false;
	rightAtriumArea: number = null;
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);

		this.set_score_name("Probabilité d'HTAP");

		this.helpItems = [
			{ item : "notch", title: "Notch pulmonaire", desc: "Encoche mésosystolique sur le flux pulmonaire antérograde en Doppler pulsé." },
			{ item : "dilatedVenaCava", title: "VCI dilatée et non compliante", desc: "Diamètre maximal de la veine cave inférieure > 21 mm avec diminution de sa compliance (< 50% au sniff test ou < 20% en inspiration normale)." }
		];
	}
	
	// Calculate the score according to values entered by user
	calculate (): boolean
	{
		// Array with values to validate according to what is needed for the score
		this.dataToValidate = [];
		if (this.tricRegMeasured) this.dataToValidate = [this.tricRegVelocity];
		if (!this.tricRegMeasured || (this.tricRegVelocity > 0 && this.tricRegVelocity <= 3.4)) this.dataToValidate.push(this.pvat, this.rightAtriumArea);

		// First we verify validity of sent data ==> do not calculate if unvalid
		if (this.validate_data())
		{
			// Check if there if indirect PH signs
			let otherPhSigns: boolean = false;
			if (this.rvLargerThanLv || this.dshape || this.notch || this.dilatedVenaCava || this.pvat < 105 || this.pulmRegVelocity > 2.2 || this.pulmArtDiameter > 25 || this.rightAtriumArea > 18) otherPhSigns = true;
			
			// Set the result based on TR Vmax and if needed, other PH signs
			if (this.tricRegMeasured && (this.tricRegVelocity > 3.4 || (this.tricRegVelocity > 2.8 && otherPhSigns)))
				this.set_interpretation("Probabilité <strong>élevée</strong>. Poursuivre les investigations : calculer le score PH-HFpEF Group et/ou pratiquer un cathétérisme cardiaque droit.");
			
			else if (this.tricRegVelocity > 2.8 || otherPhSigns)
				this.set_interpretation("Probabilité <strong>intermédiaire</strong>. Les investigations doivent être poursuivies en cas de facteurs de risque ou d'arguments supplémentaires en faveur d'une hypertension pulmonaire.");
			
			else this.set_interpretation("Probabilité <strong>faible</strong>. Considérer un diagnostic alternatif. Un suivi échographique est conseillé en cas de facteurs de risque ou autres arguments pour une hypertension pulmonaire.");
			
			return true;
		}
		else return false;
	}
	
	// Display score result when asked by user
	display (): void
	{
		// Calculate the score and display result only if has been well calculated
		if (this.calculate()) this.alert(this.scoreName, this.scoreInterpretation, "alert");
	}
}

import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the ConstrictionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-constriction',
  templateUrl: 'constriction.html',
})

export class ConstrictionPage extends Score {
	
	mitralEAOver08: boolean = true;
	dilatedVenaCava: boolean = true;
	septalShift: boolean = false;
	septalEa: number = null;
	annulusReversus: boolean = false;
	constrictiveHepaticFlow: boolean = false;
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);

		this.set_score_name("Constriction ou restriction ?");
		
		this.helpItems = [
			{ item : "annulusReversus", title: "Annulus reversus", desc: "Onde e' latérale < onde e' septale (en Doppler pulsé sur l'anneau mitral)." },
			{ item : "constrictiveHepaticFlow", title: "Flux veineux hépatique \"constrictif\"", desc: "A l'expiration, réduction du flux veineux hépatique antérograge et exagération de l'inversion télé-diastolique du flux. Le rapport vitesse rétrograde télédiastolique / vitesse antérograde devient > 0.8 (en Doppler pulsé sur les veines sus-hépatiques)." }
		];
	}
	
	// Calculate the score according to values entered by user
	calculate (): boolean
	{
		if (!this.mitralEAOver08 || !this.dilatedVenaCava)
			this.set_interpretation("Pas d'argument en faveur d'une péricardite constrictive, ou d'une cardiomyopathie restrictive.");
		
		else if (!this.septalShift)
			this.set_interpretation("Si la constriction péricardique est suspectée, poursuivre les explorations par imagerie et cathétérisme.");
		
		else
		{
			// Array with values to validate according to what is needed for the score
			this.dataToValidate = [this.septalEa];

			// First we verify validity of sent data ==> do not calculate if unvalid
			if (this.validate_data())
			{
				if (this.septalEa < 6)
					this.set_interpretation("Cardiomyopathie restrictive.");
				
				else if (this.septalEa > 8)
					this.set_interpretation("Péricardite chronique constrictive.");
				
				else if (this.constrictiveHepaticFlow)
					this.set_interpretation("Péricardite chronique constrictive.");
				
				else if (this.annulusReversus)
					this.set_interpretation("Evaluation plutôt en faveur d'une péricardite chronique constrictive.");
				
				else this.set_interpretation("Evaluation plutôt en faveur d'une cardiomyopathie restrictive.");
				
				return true;
			}
			else return false;
		}
		
		return true;
	}
	
	// Display score result when asked by user
	display (): void
	{
		// Calculate the score and display result only if has been well calculated
		if (this.calculate())
		{
			// Calculate the score and display result only if has been well calculated
			if (this.calculate()) this.alert(this.scoreName, this.scoreInterpretation, "alert");
		}
	}
}

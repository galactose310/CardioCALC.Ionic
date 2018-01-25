import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the HemorragePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hemorrhages',
  templateUrl: 'hemorrhages.html',
})

export class HemorrhagesPage extends Score {
	
	renalOrLiver: boolean = false;
	alcohol: boolean = false;
	cancer: boolean = false;
	ageOver75: boolean = false;
	thrombopenia: boolean = false;
	bleeding: boolean = false;
	hypertension: boolean = false;
	anemia: boolean = false;
	genetics: boolean = false;
	fallrisk: boolean = false;
	stroke: boolean = false;
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);

		this.set_score_name("Score HEMORR<sub>2</sub>HAGES");
		
		this.helpItems = [
			{ item: "thrombopenia", title: "Thrombopénie ou thrombopathie", desc: "Utilisation d'Aspirine, thrombocytopénie, dyscrasie sanguine (ex : hémopathie maligne)." },
			{ item: "genetics", title: "Facteurs génétiques", desc: "Polymorphisme génétique du CYP2C19." },
			{ item: "fallrisk", title: "Risque de chute", desc: "Dont troubles neurologiques et/ou psychiatriques." }
		];
	}
	
	// Calculate the score according to values entered by user
	calculate (): void
	{
		// this.bleeding twice to count for 2 points
		this.dataToCount = [this.renalOrLiver, this.alcohol, this.cancer, this.ageOver75, this.thrombopenia, this.bleeding, this.bleeding, this.hypertension, this.anemia, this.genetics, this.fallrisk, this.stroke];
		
		this.set_score_result(this.count_true());
	}
	
	// Display score result when asked by user
	display (): void
	{
		this.calculate();
		
		let risk: number = 0;
		// Set interpretation message to display with score result
		switch (this.scoreResult)
		{
			case 0:
				risk = 1.9;
				break;
			case 1:
				risk = 2.5;
				break;
			case 2:
				risk = 5.3;
				break;
			case 3:
				risk = 8.4;
				break;
			case 4:
				risk = 10.4;
				break;
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
				risk = 12.3;
				break;
			default:
				this.alert("Erreur", "Mauvaise implémentation de la fonction", "toast");
				return;
		}
		this.set_interpretation("Risque hémorragique : " + risk + "% par an (sous Warfarine).");
		
		// Display score result
		super.display();
	}
}

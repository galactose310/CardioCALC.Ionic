import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the TachycardiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tachycardia',
  templateUrl: 'tachycardia.html',
})

export class TachycardiaPage extends Score {
	
	initialRinV1: boolean = false;
	initialRinV1V2_40ms: boolean = false;
	notchedSinV1: boolean = false;
	initialRinAVR: boolean = false;
	rwptD2_50: boolean = false;
	noRSinPrecordials: boolean = false;
	avDissociation: boolean = false;
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);

		this.set_score_name("Score VT");
		
		this.helpItems = [
			{ item: "initialRinV1", title: "Onde R initiale en V1", desc: "Onde R débutant le QRS en V1 avec un aspect d'onde R monophasique (avec ou sans notch), ou RS avec R > S, ou Rsr'. A l'exception des ondes R monophasiques avec notch sur la partie ascendante si la partie inférieure du notch est au niveau de la moitié inférieure de l'onde R (variante de l'aspect rsR' des TSV)." },
			
			{ item: "initialRinV1V2_40ms", title: "Onde r initiale > 40 ms en V1 ou V2", desc: "Ce critère ne doit être retenu qu'en cas de QRS à prédominance négative. Correspond le plus souvent à un motif rS en V1 avec petite onde r large et aplatie." },
			
			{ item: "notchedSinV1", title: "Notch de l'onde S en V1", desc: "Quels que soient l'aspect et la durée de la déflexion, qu'elle soit située au démarrage, au nadir ou à la terminaison de l'onde S." },
			
			{ item: "initialRinAVR", title: "Onde R initiale en aVR", desc: "Onde R débutant le QRS en aVR avec un aspect d'onde R monophasique (avec ou sans notch), ou RS avec R > S, ou Rsr' (mêmes critères que pour l'onde R initiale en V1)." },
			
			{ item: "rwptD2_50", title: "Pic de R en D2 > 50 ms", desc: "Déflexion intrinsécoïde en D2 > 50 ms après le début du QRS. Note : en cas d'onde S initiale, c'est alors le nadir de S qui est pris en compte." },
			
			{ item: "noRSinPrecordials", title: "Absence de RS en V1-V6", desc: "Aucun motif RS, rS ou Rs retrouvé dans une des dérivations de V1 à V6. Tous les autres motifs sont possibles." },
			
			{ item: "avDissociation", title: "Dissociation atrio-ventriculaire", desc: "Les complexes QRS sont indépendant de la dépolarisation atriale. En particulier : complexes de capture, de fusion, ou conduction rétrograde non 1:1 (par ex. 2:1 ou 3:2)." }
		];
	}
	
	// Calculate the score according to values entered by user
	calculate (): void
	{
		// this.avDissociation twice to be counted as 2 points
		this.dataToCount = [this.initialRinV1, this.initialRinV1V2_40ms, this.notchedSinV1, this.initialRinAVR, this.rwptD2_50, this.noRSinPrecordials, this.avDissociation, this.avDissociation];

		this.set_score_result(this.count_true());
	}
	
	// Display score result when asked by user
	display (): void
	{
		// Calculate the score and display result only if has been well calculated
		this.calculate();

		// Set interpretation message to display with score result
		switch (this.scoreResult)
		{
			case 0:
				this.set_interpretation("Tachycardie probablement supra-ventriculaire.");
				break;
			case 1:
			case 2:
				this.set_interpretation("Zone d'incertitude : tachycardie d'interprétation difficile.");
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
				this.set_interpretation("Tachycardie ventriculaire quasi-certaine.");
				break;
			default:
				this.alert("Erreur", "Mauvaise implémentation de la fonction", "toast");
				return;
		}

		// Display score result
		super.display();
	}
}

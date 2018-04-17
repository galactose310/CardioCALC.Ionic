import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the SyncopePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-syncope',
  templateUrl: 'syncope.html',
})

export class SyncopePage extends Score {
	
	vagalPredisposition: boolean = false;
	cardiacHistory: boolean = false;
	abnormalBP: boolean = false;
	troponin: boolean = false;
	abnormalAxis: boolean = false;
	qrsOver130: boolean = false;
	longQT: boolean = false;
	diagnosis: string = "other";
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);

		this.set_score_name("Canadian Syncope Risk");
		
		this.helpItems = [
			{ item : "vagalPredisposition", title: "Prédisposition aux symptômes vagaux", desc: "Manifestations vagales déclenchées dans des endroits chauds avec foule, à la station debout prolongée, les peurs, émotions et la douleur." },
			{ item : "cardiacHistory", title: "Antécédent cardiologique", desc: "Coronaropathie, cardiomyopathie, insuffisance cardiaque chronique, valvulopathie, antécédent d'arythmie (atriale ou ventriculaire) ou d'implantation de stimulateur cardiaque." },
			{ item : "abnormalBP", title: "PAS < 90 ou > 180 mmHg", desc: "PA systolique mesurée au moins une fois < 90 ou > 180 mmHg à n'importe quel moment (triage ou service d'urgences)." },
			{ item : "abnormalAxis", title: "Axe de QRS anormal", desc: "Axe de QRS dévié à < -30° ou > 100°." }
			
		];
	}
	
	// Calculate the score according to values entered by user
	calculate (): boolean
	{
		// Let's calculate the score
		let score = 0;
		if (this.vagalPredisposition) score -= 1;
		if (this.cardiacHistory) score += 1;
		if (this.abnormalBP) score += 2;
		if (this.troponin) score += 2;
		if (this.abnormalAxis) score += 1;
		if (this.qrsOver130) score += 1;
		if (this.longQT) score += 2;
		switch (this.diagnosis)
		{
			case "cardiac":
				score += 2;
				break;
			case "vasovagal":
				score -= 2;
				break;
			case "other":
				break;
			default:
				this.alert("Erreur", "Diagnostic aux urgences mal renseigné.");
				return false;
		}
		
		// Set the score and message to display to evaluate event risk
		this.set_score_result(score);
		
		switch (score)
		{
			case -3:
				this.set_interpretation("Risque <strong>très faible</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 0.4 %.");
				break;
			case -2:
				this.set_interpretation("Risque <strong>très faible</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 0.7 %.");
				break;
			case -1:
				this.set_interpretation("Risque <strong>faible</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 1.2 %.");
				break;
			case 0:
				this.set_interpretation("Risque <strong>faible</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 1.9 %.");
				break;
			case 1:
				this.set_interpretation("Risque <strong>moyen</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 3.1 %.");
				break;
			case 2:
				this.set_interpretation("Risque <strong>moyen</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 5.1 %.");
				break;
			case 3:
				this.set_interpretation("Risque <strong>moyen</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 8.1 %.");
				break;
			case 4:
				this.set_interpretation("Risque <strong>élevé</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 12.9 %.");
				break;
			case 5:
				this.set_interpretation("Risque <strong>élevé</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 19.7 %.");
				break;
			case 6:
				this.set_interpretation("Risque <strong>très élevé</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 28.9 %.");
				break;
			case 7:
				this.set_interpretation("Risque <strong>très élevé</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 40.3 %.");
				break;
			case 8:
				this.set_interpretation("Risque <strong>très élevé</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 52.8 %.");
				break;
			case 9:
				this.set_interpretation("Risque <strong>très élevé</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 65.0 %.");
				break;
			case 10:
				this.set_interpretation("Risque <strong>très élevé</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 75.5 %.");
				break;
			case 11:
				this.set_interpretation("Risque <strong>très élevé</strong> : risque d'évènement cardiaque grave à 30 jours estimé à 83.6 %.");
				break;
			default:
				this.alert("Erreur", "Merci de contacter l'équipe de développement pour signaler ce dysfonctionnement.");
				break;
		}
		
		return true;
	}
	
	// Display score result when asked by user
	display (): void
	{
		// Calculate the score and display result only if has been well calculated
		if (this.calculate()) super.display();
	}
}

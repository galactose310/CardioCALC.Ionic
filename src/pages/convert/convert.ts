import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the ConvertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-convert',
  templateUrl: 'convert.html',
})

export class ConvertPage extends Score {
	
	cholesterol_g: number = null;
	cholesterol_mmol: number = null;
	pressure_kpa: number = null;
	pressure_mmhg: number = null;
	glycemia_g: number = null;
	glycemia_mmol: number = null;
	creatinine_g: number = null;
	creatinine_mmol: number = null;
	triglycerides_g: number = null;
	triglycerides_mmol: number = null;
	proteines_g: number = null;
	proteines_mmol: number = null;
	time_ms: number = null;
	time_bpm: number = null;
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);
		this.set_score_name("Conversions d'unités");
	}
	
	cholesterol(from: string): void
	{
		switch (from)
		{
			case "g":
				this.cholesterol_mmol = Math.round(100 * 2.586 * this.cholesterol_g) / 100;
				break;
			case "mmol":
				this.cholesterol_g = Math.round(100 * this.cholesterol_mmol / 2.586) / 100;
				break;
			default:
				this.alert("Erreur", "Erreur d'implémentation de la fonction", "toast");
				break;
		}
	}
	
	pressure(from: string): void
	{
		switch (from)
		{
			case "kpa":
				this.pressure_mmhg = Math.round(100 * 7.5 * this.pressure_kpa) / 100;
				break;
			case "mmhg":
				this.pressure_kpa = Math.round(100 * this.pressure_mmhg / 7.5) / 100;
				break;
			default:
				this.alert("Erreur", "Erreur d'implémentation de la fonction", "toast");
				break;
		}
	}
	
	glycemia(from: string): void
	{
		switch (from)
		{
			case "g":
				this.glycemia_mmol = Math.round(100 * 5.5 * this.glycemia_g) / 100;
				break;
			case "mmol":
				this.glycemia_g = Math.round(100 * this.glycemia_mmol / 5.5) / 100;
				break;
			default:
				this.alert("Erreur", "Erreur d'implémentation de la fonction", "toast");
				break;
		}
	}
	
	creatinine(from: string): void
	{
		switch (from)
		{
			case "mg":
				this.creatinine_mmol = Math.round(100 * 8.84 * this.creatinine_g) / 100;
				break;
			case "mmol":
				this.creatinine_g = Math.round(100 * this.creatinine_mmol / 8.84) / 100;
				break;
			default:
				this.alert("Erreur", "Erreur d'implémentation de la fonction", "toast");
				break;
		}
	}
	
	time(from: string): void
	{
		switch (from)
		{
			case "ms":
				this.time_bpm = Math.round(60 * 1000 / this.time_ms);
				break;
			case "bpm":
				this.time_ms = Math.round(60 * 1000 / this.time_bpm);
				break;
			default:
				this.alert("Erreur", "Erreur d'implémentation de la fonction", "toast");
				break;
		}
	}
	
	triglycerides(from: string): void
	{
		switch (from)
		{
			case "g":
				this.triglycerides_mmol = Math.round(100 * 1.13 * this.triglycerides_g) / 100;
				break;
			case "mmol":
				this.triglycerides_g = Math.round(100 * this.triglycerides_mmol / 1.13) / 100;
				break;
			default:
				this.alert("Erreur", "Erreur d'implémentation de la fonction", "toast");
				break;
		}
	}
	
	proteines(from: string): void
	{
		switch (from)
		{
			case "g":
				this.proteines_mmol = Math.round(100 * 14.5 * this.proteines_g) / 100;
				break;
			case "mmol":
				this.proteines_g = Math.round(100 * this.proteines_mmol / 14.5) / 100;
				break;
			default:
				this.alert("Erreur", "Erreur d'implémentation de la fonction", "toast");
				break;
		}
	}
	
}

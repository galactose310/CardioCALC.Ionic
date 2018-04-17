import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';
import { BodysurfacePage } from '../bodysurface/bodysurface';

/**
 * Generated class for the DiastolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-diastole',
  templateUrl: 'diastole.html',
})

export class DiastolePage extends Score {
	
	normalLVEF: boolean = true;
	diastolicDysfunction: boolean = false;
	atrialFibrillation: boolean = false;
	mitralEwave: number = null;
	mitralAwave: number = null;
	averageEe: number = null;
	septalEa: number = null;
	lateralEa: number = null;
	tricRegMeasured: boolean = true;
	tricRegVelocity: number = null;
	indexedLAvolume: boolean = true;
	leftAtriumVolume: number = null;
	height: number = null;
	weight: number = null;
	
	constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
	{
		super(alertCtrl, toastCtrl);

		this.set_score_name("Fonction diastolique");
	}
    
	// Calculate bodysurface area
	bodysurface(): number
	{
		this.dataToValidate = [this.height, this.weight];
		if (this.indexedLAvolume) return 1;
		if (!this.validate_data(false)) return 0;
		return new BodysurfacePage(this.alertCtrl, this.toastCtrl).bodysurface_formula(this.weight, this.height);
	}
    
    // Return number of matched criteria
    criteriaCalc(criteria: boolean[]): number
    {
        let numOfCriteria = 0;
        for (let i = 0; i < criteria.length; i++)
        {
            if (criteria[i]) numOfCriteria++;
        }
        return numOfCriteria;
    }
	
	// Calculate the score according to values entered by user
	calculate (): boolean
	{
		// Define number of criteria to be checked by default for evaluation of diastolic function
		let criteriaToCheck = 4;
		
		// Array with values to validate according to what is needed for the score
		this.dataToValidate = [this.mitralEwave, this.mitralAwave, this.septalEa, this.lateralEa, this.leftAtriumVolume];
		if (!this.indexedLAvolume) this.dataToValidate.push(this.height, this.weight);
		
		// If tricuspid regurgitation has not been measured, we need to check one criterion less
		(this.tricRegMeasured) ? this.dataToValidate.push(this.tricRegVelocity) : criteriaToCheck--;
		
		// First we verify validity of sent data ==> do not calculate if unvalid
		if (this.validate_data())
		{
			// Calculate number of criteria for diastolic dysfunction
			let criteria = this.criteriaCalc([
					(this.mitralEwave / ((Number(this.septalEa) + Number(this.lateralEa)) / 2) > 14),
					(this.septalEa < 7 || this.lateralEa < 10),
					(this.tricRegMeasured && this.tricRegVelocity > 2.8),
					(this.leftAtriumVolume / this.bodysurface() > 34) // this.bodysurface() = 1 in case indexedLAvolume is true
				]);
			
			// When there is normal LVEF and no criteria for diastolic dysfunction
			if (this.normalLVEF && (criteria / criteriaToCheck) < 0.5)
						this.set_interpretation("Fonction diastolique normale. Pressions de remplissage normales.");
			
			// If LEVF is normal and diastolic dysfunction is not certain
			else if (this.normalLVEF && (criteria / criteriaToCheck) == 0.5)
						this.set_interpretation("Fonction diastolique intermédiaire. Pressions de remplissage indéterminées. Considérez de compléter l'évaluation avec d'autres méthodes (Doppler veine pulmonaire, etc).");
			
			// Else, we have diastolic dysfunction and we have to grade it
			else
			{
				// Assess mitral E and A wave with Doppler ==> quick estimation of diastolic function
				if (this.mitralEwave <= 50 && (this.mitralEwave / this.mitralAwave <= 0.8))
						this.set_interpretation("Dysfonction diastolique de grade 1. Pressions de remplissage normales.");
				else if (this.mitralEwave / this.mitralAwave >= 2)
						this.set_interpretation("Dysfonction diastolique de grade 3. Pressions de remplissage élevées.");
				
				// If needed, go further in the evaluation
				else
				{
					// If we have to grade diastolic dysfunction, there is one criterion less to check (in comparison to diastolic function)
					criteriaToCheck--;
					
					// Calculate number of criteria to grade diastolic dysfunction
					let gradeCriteria = this.criteriaCalc([
							(this.mitralEwave / ((Number(this.septalEa) + Number(this.lateralEa)) / 2) > 14),
							(this.tricRegMeasured && this.tricRegVelocity > 2.8),
							(this.leftAtriumVolume / this.bodysurface() > 34) // this.bodysurface() = 1 in case indexedLAvolume is true
						]);
					
					// Grade of diastolic dysfunction according to the checked criteria
					if (gradeCriteria / criteriaToCheck > 0.5)
						this.set_interpretation("Dysfonction diastolique de grade 2. Pressions de remplissage élevées.");
					else if (gradeCriteria / criteriaToCheck == 0.5)
						this.set_interpretation("Dysfonction diastolique de grade indéterminé. Pressions de remplissage indéterminées. Considérez de compléter l'évaluation avec d'autres méthodes (Doppler veine pulmonaire, etc).");
					else this.set_interpretation("Dysfonction diastolique de grade 1. Pressions de remplissage normales.");
				}
			}
			
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

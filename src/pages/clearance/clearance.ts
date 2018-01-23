import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the ClearancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-clearance',
  templateUrl: 'clearance.html',
})

export class ClearancePage extends Score {
    
    method: string = "ckdepi";
    age: number = null;
    weight: number = null;
    creatinine: number = null;
    sexFemale: boolean = false;
    ethnicityAfrican: boolean = false;
    creatInMol: boolean = true;
    
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
        this.set_score_name("Clairance rénale (ml/min)");
    }
    
    // Choose if ethnicity is african or not
    ethnicity_toggle (): void
    {
        (this.ethnicityAfrican) ? this.ethnicityAfrican = false : this.ethnicityAfrican = true;
    }
    
    // Formula for CKD-EPI Clearance
    ckdepi_formula (): number
    {
		this.dataToValidate = [this.age, this.creatinine];
		if (!this.validate_data(false)) return 0;
		
        let alpha: number = null;
        let kappa: number = null;
        let coeff: number = null;
        
        // Adjust coefficients if female
        if (this.sexFemale)
        {
            alpha = -0.329;
            kappa = 0.7;
            coeff = 1.018;
        }
        
        // Or otherwise
        else
        {
            alpha = -0.411;
            kappa = 0.9;
            coeff = 1;
        }
        
        // Adjust coefficient if african
        (this.ethnicityAfrican) ? coeff = 1.159 * coeff : coeff = coeff;
        
        // Finally calculate with CKD-EDI equation *** NOTE *** 0.1 correction for mg/L ==> mg/dL
        return Math.floor(
		                    141
		                    * Math.pow(Math.min(0.1*this.convert_creatinine("mg")/kappa, 1), alpha)
		                    * Math.pow(Math.max(0.1*this.convert_creatinine("mg")/kappa, 1), -1.209)
		                    * Math.pow(0.993, this.age)
		                    * coeff
		                );
    }
    
    // Formula for MDRD Clearance
    mdrd_formula (): number
    {
		this.dataToValidate = [this.age, this.creatinine];
		if (!this.validate_data(false)) return 0;
		
        // Correction coefficient based on IDMS method, gender and ethnicity
        let coeff: number = 0.95;
        (this.ethnicityAfrican) ? coeff = 1.21 * coeff : coeff = coeff;
        (this.sexFemale) ? coeff = 0.742 * coeff : coeff = coeff;
        
        // MDRD equation using µmol/l creatinine
        return Math.floor(186 * coeff * Math.pow(this.convert_creatinine("mol") * 0.0113, -1.154) * Math.pow(this.age, -0.203));
    }
    
    // Formula for Cockroft Clearance
    cockroft_formula (): number
    {
		this.dataToValidate = [this.age, this.creatinine, this.weight];
		if (!this.validate_data(false)) return 0;
		
        if (this.sexFemale) return Math.floor(1.04 * this.weight * (140 - this.age) / this.convert_creatinine("mol"));
        else return Math.floor(1.23 * this.weight * (140 - this.age) / this.convert_creatinine("mol"));
    }
    
    // Convert creatinine in µmol/l
    convert_creatinine (unit: string): number
    {
        switch (unit)
        {
            case "mg":
                if (this.creatInMol) return this.creatinine * 0.11312;
                else return this.creatinine;
            case "mol":
                if (this.creatInMol) return this.creatinine;
                else return this.creatinine / 0.11312;
            default:
                return this.creatinine;
        }
    }
    
}

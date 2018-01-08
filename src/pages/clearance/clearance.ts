import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
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
    
    constructor(public alertCtrl: AlertController)
    {
        super(alertCtrl);
        this.set_score_name("Clairance rénale (ml/min)");
    }
    
    // Choose if ethnicity is african or not
    ethnicity_toggle (): void
    {
        (this.ethnicityAfrican) ? this.ethnicityAfrican = false : this.ethnicityAfrican = true;
    }
    
    // Calculate the score according to values entered by user
    calculate (): boolean
    {    
        // First we verify validity of sent data ==> do not calculate if unvalid
        (this.method == "cockroft")
            ? this.dataToValidate = [this.age, this.creatinine, this.weight]
            : this.dataToValidate = [this.age, this.creatinine];
        
        if (this.validate_data())
        {
            // And we calculate clearance with appropriate formula
            switch (this.method)
            {
                case "ckdepi":
                    this.set_score_result(this.ckdepi_formula());
                    return true;
                case "mdrd":
                    this.set_score_result(this.mdrd_formula());
                    return true;
                case "cockroft":
                    this.set_score_result(this.cockroft_formula());
                    return true;
                default:
                    this.alert("Erreur", "Le choix de la formule est mal spécifié.");
                    return false;
            }
        }
    }
    
    // Display score result when asked by user
    display (): void
    {
        // Calculate the score and display result only if has been well calculated
        if (this.calculate())
        {
            if (this.scoreResult >= 90) this.set_interpretation("<strong>Stade 1.</strong> Fonction rénale préservée ou augmentée.");
            else if (this.scoreResult < 90 && this.scoreResult >= 60)
                                        this.set_interpretation("<strong>Stade 2.</strong> Insuffisance rénale légère.");
            else if (this.scoreResult < 60 && this.scoreResult >= 45)
                                        this.set_interpretation("<strong>Stade 3a.</strong> Insuffisance rénale légère à modérée.");
            else if (this.scoreResult < 45 && this.scoreResult >= 30)
                                        this.set_interpretation("<strong>Stade 3b.</strong> Insuffisance rénale modérée à sévère.");
            else if (this.scoreResult < 30 && this.scoreResult >= 15)
                                        this.set_interpretation("<strong>Stade 4.</strong> Insuffisance rénale sévère.");
            else this.set_interpretation("<strong>Stade 5.</strong> Insuffisance rénale terminale.");
            
            // Display score result
            super.display();
        }
    }
    
    // Formula for CKD-EPI Clearance
    ckdepi_formula (): number
    {
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

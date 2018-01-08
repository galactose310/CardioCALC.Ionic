import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Score } from '../generic/generic';

/**
 * Generated class for the HcmsuddeathPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hcmsuddeath',
  templateUrl: 'hcmsuddeath.html',
})

export class HcmsuddeathPage extends Score {
    
    age: number = null;
    lvThickness: number = null;
    latriumDiam: number = null;
    lvgradient: number = null;
    suddeath: number = 0;
    nsvt: number = 0;
    syncope: number = 0;
    
    private scoreForm: FormGroup;
    
    constructor(public alertCtrl: AlertController, private formBuilder: FormBuilder)
    {
        super(alertCtrl);
        this.scoreForm = this.formBuilder.group({
            age: [''],
            lvThickness: [''],
            latriumDiam: [''],
            lvgradient: ['']
        });
        
        this.set_score_name("Risque de mort subite à 5 ans (%)");
    }
    
    // Change diabetes value if toggled
    suddeath_toggle (): void
    {
        (this.suddeath == 0) ? this.suddeath = 1 : this.suddeath = 0;
    }
    
    // Change fibrillation value if toggled
    nsvt_toggle (): void
    {
        (this.nsvt == 0) ? this.nsvt = 1 : this.nsvt = 0;
    }
    
    // Switch the form to display if lvmass is already known
    syncope_toggle (): void
    {
        (this.syncope == 0) ? this.syncope = 1 : this.syncope = 0;
    }
    
    // Calculate the score according to values entered by user
    calculate (): boolean
    {
        // List on input to check before we can calculate the score
        this.dataToValidate = [this.age, this.lvThickness, this.latriumDiam, this.lvgradient];
        
        // First we verify validity of sent data ==> do not calculate if unvalid
        if (this.validate_data())
        {
            if (this.age < 16 || this.age > 80)
            {
                this.alert("Erreur", "L'âge doit être compris entre 16 et 80 ans.");
                return false;
            }
            if (this.lvThickness < 10 || this.lvThickness > 35)
            {
                this.alert("Erreur", "L'épaisseur du ventricule gauche doit être comprise entre 10 et 35 mm.");
                return false;
            }
            if (this.latriumDiam < 28 || this.latriumDiam > 67)
            {
                this.alert("Erreur", "Le diamètre de l'oreillette gauche doit être compris entre 28 et 67 mm.");
                return false;
            }
            if (this.lvgradient < 2 || this.lvgradient > 154)
            {
                this.alert("Erreur", "Le gradient intra-VG doit être compris entre 2 et 154 mmHg.");
                return false;
            }
            
            // Calculate score and round it to 2 decimals
            this.set_score_result(Math.round(100 * (
                                    1
                                    - (Math.pow(0.998, Math.exp((0.15939858*this.lvThickness)-(0.00294271 * this.lvThickness * this.lvThickness)
                                    + (0.0259082 * this.latriumDiam)
                                    + (0.00446131 * this.lvgradient) + (0.4583082 * this.suddeath)
                                    + (0.82639195 * this.nsvt)
                                    + (0.71650361 * this.syncope)
                                    - (0.01799934 * this.age)))))
                                    * 100)
                                / 100);

            return true;    
        }
        else return false;
    }
    
    // Display score result when asked by user
    display (): void
    {
        // Calculate the score and display result only if has been well calculated
        if (this.calculate())
        {
            // Set interpretation message to display with score result
            if (this.scoreResult < 4) this.set_interpretation("Risque faible : DAI en général non indiqué.");
            else if (this.scoreResult >= 6) this.set_interpretation("Risque élevé : le DAI devrait être considéré.");
            else this.set_interpretation("Risque intermédiaire : le DAI peut être considéré.");
            
            // Display score result
            super.display();
        }
    }
    
}

import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Score } from '../generic/generic';

/**
* Generated class for the BerthelotPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'page-berthelot',
    templateUrl: 'berthelot.html',
})

export class BerthelotPage extends Score {
    
    diabetes: number = 0;
    fibrillation: number = 0;
    latriumArea: number = null;
    rventricleArea: number = null;
    septum: number = null;
    lvdiam: number = null;
    lvwall: number = null;
    height: number = null;
    weight: number = null;
    lvmass: number = null;
    bodysurf: number = 0;
    lvmassIsKnown: boolean = true;
    
    private scoreForm: FormGroup;
    
    constructor(public alertCtrl: AlertController, private formBuilder: FormBuilder, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
        this.scoreForm = this.formBuilder.group({
            latriumArea: [''],
            rventricleArea: [''],
            septum: [''],
            lvdiam: [''],
            lvwall: [''],
            height: [''],
            weight: [''],
            lvmass: ['']
        });
        
        this.set_score_name("Score de Berthelot");
    }
    
    // Change diabetes value if toggled
    diabetes_toggle (): void
    {
        (this.diabetes == 0) ? this.diabetes = 1 : this.diabetes = 0;
    }
    
    // Change fibrillation value if toggled
    fibrillation_toggle (): void
    {
        (this.fibrillation == 0) ? this.fibrillation = 1 : this.fibrillation = 0;
    }
    
    // Switch the form to display if lvmass is already known
    lvmass_toggle (): void
    {
        (this.lvmassIsKnown) ? this.lvmassIsKnown = false : this.lvmassIsKnown = true;
    }
    
    // Calculate the score according to values entered by user
    calculate (): boolean
    {
        // Array with values to validate according to what is needed for the score
        (this.lvmassIsKnown)
            ? this.dataToValidate = [this.latriumArea, this.rventricleArea, this.lvmass]
            : this.dataToValidate = [this.latriumArea, this.rventricleArea, this.septum, this.lvdiam, this.lvwall, this.height, this.weight];
        
        // First we verify validity of sent data ==> do not calculate if unvalid
        if (this.validate_data())
        {
            // Temporary variable to save score calculation
            let tmp = 0;
            
            // Increment if diabetes, fibrillation, or rventricle dilatation
            tmp += this.diabetes + (2 * this.fibrillation) + (this.rventricleArea < 27 ? 2 : 0);
            
            // Score calculation : left atrium area
            if (15 <= this.latriumArea && this.latriumArea < 19) tmp += 1;
                else if (19 <= this.latriumArea && this.latriumArea < 24) tmp += 2;
                else if (this.latriumArea >= 24) tmp += 3;
                else tmp += 0;
            
            // Score calculation : lV mass index
            if (46 < this.LVMass() && this.LVMass() <= 62) tmp += 1;
                else if (62 < this.LVMass() && this.LVMass() <= 81) tmp += 2;
                else if (this.LVMass() > 81) tmp += 3;
                else tmp += 0;
            
            // Set the score to be displayed in the view, and reinitialize tmp
            this.set_score_result(tmp);
            tmp = 0;
            
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
            if (this.scoreResult <= 4)
                this.set_interpretation("Forte probabilité d'hypertension pulmonaire <strong>pré-capillaire</strong> : référer le patient à un centre de référence d'HTP pour cathétérisme cardiaque droit.");
                
            else if (this.scoreResult >= 7)
                this.set_interpretation("Forte probabilité d'hypertension pulmonaire <strong>post-capillaire</strong> dans le cadre d'une insuffisance cardiaque : traiter le patient avec des diurétiques et réévaluer.");
                
            else this.set_interpretation("Référer le patient à un centre de référence d'hypertension pulmonaire pour cathétérisme cardiaque droit.");
            
            // Display score result
            super.display();
        }
    }
    
    // Calculate LV mass
    LVMass (): number
    {
        if (this.lvmassIsKnown) return this.lvmass;
        else return ((1.04 * 0.8 * (Math.pow(this.septum/10 + this.lvdiam/10 + this.lvwall/10, 3) - Math.pow(this.lvdiam/10, 3))) + 0.6) / this.bodySurface();
        //else return ((0.8 * (1.04 * (Math.pow(this.lvdiam + this.septum + this.lvwall, 3) - Math.pow(this.lvdiam, 3))) + 0.6) / 1000) / this.bodySurface();
    }
    
    // Calculate body surface area - height in CM, weight in KG
    bodySurface (): number
    {
        this.bodysurf = 0.0003207 * Math.pow(this.weight*1000, (0.7285-(0.0188*Math.log10(this.weight*1000)))) * Math.pow(this.height, 0.3);
        return this.bodysurf;
    }
    
}

import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the QtintervalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qtinterval',
  templateUrl: 'qtinterval.html',
})

export class QtintervalPage extends Score {
    
    qtinterval: number = null;
    heartRate: number = null;
    rrinterval: number = null;
    largeqrs: boolean = false;
    qrsinterval: number = null;
    sexcoefficient: number = -22;
    method: string = "rr";
    intervalUnit: string = "ms";

    constructor(public alertCtrl: AlertController)
    {
        super(alertCtrl);
        this.set_score_name("QT corrigé (ms)");
    }
    
    // Toggle if QRS are large
    largeqrs_toggle (): void
    {
        (this.largeqrs) ? this.largeqrs = false : this.largeqrs = true;
    }
    
    // Calculate the score according to values entered by user
    calculate (): boolean
    {    
        // First we verify validity of sent data ==> do not calculate if unvalid
        this.dataToValidate = [this.qtinterval];
        (this.method == "rr") ? this.dataToValidate.push(this.rrinterval) : this.dataToValidate.push(this.heartRate);
        if (this.largeqrs) this.dataToValidate.push(this.qrsinterval);
        
        if (this.validate_data())
        {
            // And we calculate corrected QT with appropriate formula
            // If QRS are enlarged
            if (this.largeqrs)
            {
                switch (this.method)
                {
                    case "rr":
                        this.set_score_result(Math.round(this.qtinterval - 155 * (0.001 * this.convert_rrint() - 1) - 0.93 * (this.qrsinterval - 139) + this.sexcoefficient));
                        return true;
                    case "hr":
                        this.set_score_result(Math.round(this.qtinterval - 155 * (60 / this.heartRate - 1) - 0.93 * (this.qrsinterval - 139) + this.sexcoefficient));
                        return true;
                    default:
                        this.alert("Erreur", "Méthode à utiliser non définie.");
                        return false;
                }
            }
            
            // If case of thin QRS
            else
            {
                switch (this.method)
                {
                    case "rr":
                        this.set_score_result(Math.round(this.qtinterval / Math.sqrt(0.001 * this.convert_rrint())));
                        return true;
                    case "hr":
                        this.set_score_result(Math.round(this.qtinterval / Math.sqrt(60 / this.heartRate)));
                        return true;
                    default:
                        this.alert("Erreur", "Méthode à utiliser non définie.");
                        return false;
                }
            }
        }
    }

    // Display score result when asked by user
    display (): void
    {
        // Calculate the score and display result only if has been well calculated
        if (this.calculate())
        {
            this.set_interpretation("Valeurs normales : QTc ≤ 440 ms (homme) ou ≤ 450 ms (femme).");
            
            // Display score result
            super.display();
        }
    }
    
    // Convert rrinterval in appropriate unit
    convert_rrint (): number
    {
        switch (this.intervalUnit)
        {
            case "ms":
                return this.rrinterval;
            case "mm25":
                return this.rrinterval * 40;
            case "mm50":
                return this.rrinterval * 20;
            default:
                return this.rrinterval;
        }
    }
    
}

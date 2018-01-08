import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Score } from '../generic/generic';

/**
 * Generated class for the BodysurfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bodysurface',
  templateUrl: 'bodysurface.html',
})

export class BodysurfacePage extends Score {
    
    weight: number = null;
    height: number = null;
    
    private scoreForm: FormGroup;
    
    constructor(public alertCtrl: AlertController, private formBuilder: FormBuilder)
    {
        super(alertCtrl);
        this.set_score_name("Surface corporelle (m²)");
        
        // Set up page form
        this.scoreForm = this.formBuilder.group({
            weight: [''],
            height: ['']
        });
        
    }
    
    // Calculate the score according to values entered by user
    calculate (): boolean
    {    
        // First we verify validity of sent data ==> do not calculate if unvalid
        this.dataToValidate = [this.weight, this.height];
        if (this.validate_data())
        {
            this.set_score_result(Math.round(1000 * 0.0003207 * Math.pow(this.weight*1000, (0.7285-(0.0188*Math.log10(this.weight*1000)))) * Math.pow(this.height, 0.3)) / 1000);
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
            // Display score result
            super.display();
        }
    }
    
}

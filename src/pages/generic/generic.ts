import { AlertController } from 'ionic-angular';

export class Score
{
    scoreName: string = null;
    scoreResult: number = null;
    scoreInterpretation: string = null;
    
    dataToValidate: Array<number>;
    
    constructor (public alertCtrl: AlertController)
    {
        
    }
    
    // Check if a variable has an empty value
    empty (data: any): boolean
    {
        if (data == null || data == '') return true;
        else return false;
    }
    
    // Check if each data from dataToValidate is valid (not an empty number)
    validate_data (): boolean
    {
        for (let i = 0; i < this.dataToValidate.length; i++)
        {
            if (this.empty(this.dataToValidate[i]))
            {
                this.alertCtrl.create({
                        title: 'Erreur',
                        subTitle: 'Remplissez tous les champs.',
                        buttons: ['OK'],
                        cssClass: 'alerts'
                    }).present();
                return false;
            }
            
            else if (isNaN(this.dataToValidate[i]))
            {
                this.alertCtrl.create({
                        title: 'Erreur',
                        subTitle: 'N\'utilisez que des nombres.',
                        buttons: ['OK'],
                        cssClass: 'alerts'
                    }).present();
                return false;
            }
        }
        
        // If valid
        return true;
    }
    
    // Set score name
    set_score_name (name: string = null)
    {
        this.scoreName = name;
    }
    
    // Set score result
    set_score_result (score: number = null)
    {
        this.scoreResult = score;
    }
    
    // Set interpretation message for the score
    set_interpretation (message: string = null)
    {
        this.scoreInterpretation = message;
    }
    
    // Display score result
    display ()
    {
        this.alertCtrl.create({
                title: this.scoreName + ' : ' + this.scoreResult,
                subTitle: this.scoreInterpretation,
                buttons: ['OK'],
                cssClass: 'alerts'
            }).present();
        
        // Reinitialize score variables
        this.set_score_result();
        this.set_interpretation();
    }
    
    // Display info on item
    alert (alertTitle: string = null, alertMessage: string = null): void
    {
        this.alertCtrl.create({
                title: alertTitle,
                subTitle: alertMessage,
                buttons: ['OK'],
                cssClass: 'alerts'
            }).present();
    }
    
    // Display info on item
    item_help (itemName: string = null, itemInfo: string = null): void
    {
        this.alert(itemName, itemInfo);
    }
    
}

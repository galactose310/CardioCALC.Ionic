import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';

/**
 * Generated class for the DukePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-duke',
  templateUrl: 'duke.html',
})

export class DukePage extends Score {
    
    anapathLesion: boolean = false;
    anapathMicroorganism: boolean = false;
    positiveBloodCultures: boolean = false;
    positiveImaging: boolean = false;
    microorganism: string = null;
    imaging: string = null;
    predisposition: boolean = false;
    fever: boolean = false;
    vascularSigns: boolean = false;
    immuneSigns: boolean = false;
    minorMicroorganism: boolean = false;
    
    pathologicalCriteria: boolean = false;
    majorDukeCriteria: number = 0;
    minorDukeCriteria: number = 0;
    
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
        this.set_score_name("Critères de Duke");
        
        this.helpItems = [
            // Histological criteria
            { item: "anapathMicroorganism", title: "Micro-organismes", desc: "Micro-organismes prouvés par l'histologie ou la culture d'une végétation, d'une végétation ayant embolisé, ou d'un abcès intracardiaque." },
            { item: "anapathLesion", title: "Lésions histologiques", desc: "Végétation ou abcès intracardiaque montrant une endocardite active à l'examen histologique." },
            
            // Micro-organism description
            { item: "typicalMicroOrganism", title: "Micro-organismes typiques", desc: "Sur au moins 2 hémocultures : Streptococcus viridans ou gallolyticus (bovis), groupe HACEK, Staphylococcus aureus ou Enterococcus en absence de foyer infectieux primitif." },
            { item: "coherentMicroOrganism", title: "Micro-organismes cohérents", desc: "Bactériémie persistante à micro-organisme compatible avec une EI : au moins 2 hémocultures espacées de > 12h, ou 3/3 hémocultures positives, ou la majorité si > 4 prélèvements (avec > 1h entre le premier et le dernier prélèvement)." },
            { item: "coxiella", title: "Coxiella burnetii", desc: "Au moins 1 hémoculture positive pour Coxiella burnetii, ou titre des IgG phase I > 1:800." },
            { item: "othermicro", title: "Autres micro-organismes", desc: "Le critère majeur pour les hémocultures n'est pas atteint. Compte pour le critère mineur <em>Preuves microbiologiques</em>." },
            
            // Imaging description
            { item: "echocardiography", title: "Echocardiographie", desc: "Végétation, ou abcès / pseudoanévrysme / fistule intracardiaque, ou perforation / anévrysme valvulaire, ou nouvelles déhiscence de prothèse valvulaire." },
            { item: "petscan", title: "Pet-scanner (18F-FDG)", desc: "Activité métabolique anormale en regard d'une valve prothétique d'âge > 3 mois." },
            { item: "spect", title: "Scintigraphie", desc: "Activité métabolique anormale en regard d'une valve prothétique d'âge > 3 mois, sur scintigraphie aux leucocytes marqués." },
            { item: "cardiacct", title: "Scanner cardiaque", desc: "Lésions paravalvulaires compatibles avec une EI." },
            
            // Minor criteria
            { item: "predisposition", title: "Prédisposition clinique", desc: "Cardiopathie à risque (groupe A ou B), ou injections intraveineuses (drogues)." },
            { item: "vascularSigns", title: "Manifestations vasculaires", desc: "Embolie artérielle majeure, infarctus pulmonaire septique, anévrysme mycotique, hémorragie intracrânienne, hémorragie conjonctivale, érythème palmo-plantaire de Janeway." },
            { item: "immuneSigns", title: "Manifestations immunologiques", desc: "Glomérulonéphrite, nodules d'Osler, tâches de Roth, facteur rhumatoïde." },
            { item: "minorMicroorganism", title: "Preuves microbiologiques", desc: "Hémocultures positives ne remplissant pas les conditions des critères majeurs, ou preuve sérologique d'une infection à micro-organisme compatible avec une endocardite." }
        ];
    }
    
    // Change value if toggled
    pathological_toggle(): void
    {
        if (this.anapathLesion || this.anapathMicroorganism) this.pathologicalCriteria = true;
        else this.pathologicalCriteria = false;
    }
    
    // Calculate the score
    calculate (): boolean
    {
        if (this.positiveBloodCultures && this.microorganism == null)
            this.alert("Erreur", "Sélectionnez le micro-organisme mis en évidence dans les hémocultures.", "toast");
        
        else if (this.positiveImaging && this.imaging == null)
            this.alert("Erreur", "Sélectionnez l'examen d'imagerie ayant amené à la suspicion diagnostique.", "toast");
        
        else
        {
            this.majorDukeCriteria = this.criteriaCalc([this.positiveBloodCultures, this.positiveImaging]);
            this.minorDukeCriteria = this.criteriaCalc([this.predisposition, this.fever, this.vascularSigns, this.immuneSigns, this.minorMicroorganism]);
            
            this.set_score_result();
            
            if (this.pathologicalCriteria
                || this.majorDukeCriteria == 2
                || (this.majorDukeCriteria >= 1 && this.minorDukeCriteria >= 3)
                || this.minorDukeCriteria >= 5)
                this.set_interpretation("Endocardite infectieuse <strong>certaine</strong> : discuter le traitement au sein d'une <em>RCP endocardite</em>.");
            
            else if ((this.majorDukeCriteria == 1 && this.minorDukeCriteria >= 1) || this.minorDukeCriteria >= 3)
                this.set_interpretation("Endocardite infectieuse <strong>possible</strong> : poursuivre les investigations et discuter le traitement au sein d'une <em>RCP endocardite</em>.");
            
            else this.set_interpretation("Le diagnostic d'endocardite infectieuse est <strong>rejeté</strong> (sous réserve de l'absence d'antibiothérapie ayant duré > 4 jours avant les prélèvements).");
            
            return true;
        }
        return false;
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
    
    // Display score result after calculating it
    display (): void
    {
        // First calculate the score and then display score result
        if (this.calculate()) this.alert(this.scoreName, this.scoreInterpretation, "alert");
    }
    
}

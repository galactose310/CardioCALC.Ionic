import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Score } from '../generic/generic';
import { BodysurfacePage } from '../bodysurface/bodysurface';

/**
 * Generated class for the RightcathPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rightcath',
  templateUrl: 'rightcath.html',
})

export class RightcathPage extends Score {
	
	method: string = "rightcath";
    weight: number = null;
    height: number = null;
	heartRate: number = null;
    output: number = null;
    meanPressure: number = null;
	systPressure: number = null;
    diastPressure: number = null;
    wedgePressure: number = null;
	diastGradient: number = null;
	lvotDiam: number = null;
	lvotDoppler: number = null;
	
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
        super(alertCtrl, toastCtrl);
        this.set_score_name("Hémodynamique");
    }
    
	// Calculate bodysurface area
	bodysurface(): number
	{
		this.dataToValidate = [this.height, this.weight];
		if (!this.validate_data(false)) return 0;
		return new BodysurfacePage(this.alertCtrl, this.toastCtrl).bodysurface_formula(this.weight, this.height);
	}
	
	// Calculate diastolic gradient
	diast_gradient(): number
	{
		this.dataToValidate = [this.diastPressure, this.wedgePressure];
		if (!this.validate_data(false)) return 0;
		return Math.floor(this.diastPressure - this.wedgePressure);
	}
	
	// Calculate transpulmonary gradient
	transpulm_gradient(): number
	{
		this.dataToValidate = [this.meanPressure, this.wedgePressure];
		if (!this.validate_data(false)) return 0;
		return Math.floor(this.meanPressure - this.wedgePressure);
	}
	
	// Calculate cardiac index (precision : decimal)
	index(): number
	{
		this.dataToValidate = [this.height, this.weight, this.output];
		if (!this.validate_data(false)) return 0;
		return Math.round(10 * this.output / this.bodysurface()) / 10;
	}
	
	// Calculate pulmonary artery resistance
	resistance(): number
	{
		this.dataToValidate = [this.output, this.transpulm_gradient()];
		if (!this.validate_data(false)) return 0;
		return Math.round(10 * this.transpulm_gradient() / this.output) / 10;
	}
	
	// Calculate pulmonary artery resistance
	stroke_volume(): number
	{
		this.dataToValidate = [this.output, this.heartRate];
		if (!this.validate_data(false)) return 0;
		return Math.round(1000 * this.output / this.heartRate);
	}
	
	// Calculate pulmonary artery resistance
	capacitance(): number
	{
		this.dataToValidate = [this.diastPressure, this.systPressure, this.stroke_volume()];
		if (!this.validate_data(false)) return 0;
		return Math.round(10 * this.stroke_volume() / (this.systPressure - this.diastPressure)) / 10;
	}
	
	// LVOT surface area from echography
	lvot_surface(): number
	{
		this.dataToValidate = [this.lvotDiam];
		if (!this.validate_data(false)) return 0;
		return Math.PI * Math.pow(this.lvotDiam / 10, 2) / 4;
	}
	
	// Cardiac output from echography
	echo_stroke_vol(): number
	{
		this.dataToValidate = [this.lvot_surface(), this.lvotDoppler];
		if (!this.validate_data(false)) return 0;
		return Math.round(10 * this.lvot_surface() * this.lvotDoppler) / 10;
	}
	
	// Stroke volume from echography
	echo_output(): number
	{
		this.dataToValidate = [this.echo_stroke_vol(), this.heartRate];
		if (!this.validate_data(false)) return 0;
		return Math.round(10 * this.echo_stroke_vol() * this.heartRate / 1000) / 10;
	}
	
	// Cardiac index from echography
	echo_index(): number
	{
		this.dataToValidate = [this.echo_output(), this.weight, this.height];
		if (!this.validate_data(false)) return 0;
		return Math.round(10 * this.echo_output() / this.bodysurface()) / 10;
	}
}

import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plot } from 'src/app/_models/plot';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';

@Component({
    selector: 'app-plot-info-form',
    templateUrl: './plot-info-form.component.html',
    styleUrls: ['./plot-info-form.component.css'],
})
export class PlotInfoFormComponent implements OnInit {
    myForm!: FormGroup;
    isDisabled = true;
    plotInfo!: Plot;
    id: any;

    private plotSubscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private _portfolioService: PortfolioService,
        private _validationsService: ValidationService
    ) {}

    ngOnInit() {
        this.createForm();
        this.getPlotInfo();
    }

    createForm() {
        this.myForm = this.fb.group({
            farmAddress: new FormControl('', [
                Validators.required,
                this._validationsService.addressContainsStreetValidator,
            ]),
            size: new FormControl('', [Validators.required]),
            date: new FormControl('', [Validators.required]),
        });
    }

    getPlotInfo() {
        this._portfolioService.setFarmerPortfolio();
        this.plotSubscription = this._portfolioService
            .getFarmerPlotInfo()
            .subscribe(
                (plots: Plot[]) => {
                    if (plots.length > 0) {
                        this.populateForm(plots[0]);
                        this.isDisabled = true;
                    }
                },
                error => {
                    console.error('Error fetching plot info:', error);
                }
            );
    }

    populateForm(plot: Plot) {
        this.myForm.patchValue({
            farmAddress: plot.plotAddress,
            size: plot.plotSize,
            date: plot.dateOfOwnership,
        });
    }

    enableFields() {
        this.isDisabled = false;
        this.myForm.enable();
    }

    onCancelClicked() {
        // You can add logic to revert changes or handle cancel action if needed
        this.myForm.disable();
        this.isDisabled = true;
    }

    onSaveClicked(formData: any) {
        // Add logic to handle save action, e.g., send data to a service
        this.myForm.disable();
        this.isDisabled = true;
    }
}

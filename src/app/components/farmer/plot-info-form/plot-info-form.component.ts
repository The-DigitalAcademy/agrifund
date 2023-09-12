import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FarmerPlot } from 'src/app/_models/farmerPlot';
import { PlotService } from 'src/app/_services/plot-service/plot.service';
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
    editedData: any;
    farmerData: any;
    plotInfo!: FarmerPlot;
    id: any;

    private plotSubscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private _portfolioService: PortfolioService,
        private _validationsService: ValidationService,
        private _plotService: PlotService
    ) {}

    ngOnInit() {
        this.myForm = this.fb.group({
            plotAddress: new FormControl('', [
                Validators.required,
                this._validationsService.addressLengthValidator,
            ]),
            plotSize: new FormControl('', [Validators.required]),
            dateOfOwnership: new FormControl('', [Validators.required]),
        });

        this.plotInfo = {
            id: 0,
            plotAddress: '',
            plotSize: '',
            dateOfOwnership: '',
        };

        this._portfolioService.setFarmerPortfolio();
        this.plotSubscription = this._portfolioService
            .getFarmerPlotInfo()
            .subscribe((plots: FarmerPlot[]) => {
                if (plots.length > 0) {
                    this.plotInfo = plots[0];
                    this.myForm.patchValue({
                        plotAddress: this.plotInfo.plotAddress,
                        plotSize: this.plotInfo.plotSize,
                        dateOfOwnership: this.plotInfo.dateOfOwnership,
                    });
                }

                this.isDisabled = true;
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

    onSaveClicked() {
        if (this.myForm.valid) {
            this.plotInfo = {
                id: this.plotInfo.id,
                plotAddress: this.myForm.get('plotAddress')?.value,
                plotSize: this.myForm.get('plotSize')?.value,
                dateOfOwnership: this.myForm.get('dateOfOwnership')?.value,
            };
            console.table(this.plotInfo);
            this._plotService.editPlot(this.plotInfo);
        }

        this.myForm.disable();
        this.isDisabled = true;
    }
}

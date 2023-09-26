import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Assets } from 'src/app/_models/Assets';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { CropService } from 'src/app/_services/crop-service/crop.service';
import { FarmService } from 'src/app/_services/farm-service/farm.service';
import { PlotService } from 'src/app/_services/plot-service/plot.service';
import { FarmerPlot } from 'src/app/_models/farmerPlot';
import { FarmerFarm } from 'src/app/_models/farmerFarm';
import { FarmerCrop } from 'src/app/_models/farmerCrop';

@Component({
    selector: 'app-about-the-farm',
    templateUrl: './about-the-farm.component.html',
    styleUrls: ['./about-the-farm.component.css'],
})
export class AboutTheFarmComponent implements OnInit {
    // used to refer to the bootstrap carousel on HTML
    @ViewChild('carousel', { static: true }) private carousel!: NgbCarousel;
    // stores the active slide name id default is the first slide
    activeSlideName = 'introSlide';
    // stores plot size values for the dropdown
    plotSizes = ['0 to 2 hectares', '3 to 5 hectares', '6 to 8 hectares'];

    farmForm!: FormGroup;
    cropForm!: FormGroup;
    plotForm!: FormGroup;
    farmFormSubmitted = false;
    cropFormSubmitted = false;
    plotFormSubmitted = false;

    submitted = false;
    farm!: FarmerFarm;
    crop!: FarmerCrop;
    plots!: FarmerPlot;
    asset!: Assets;
    isLast: any;
    id = 0;

    // stores value whether a crop already exists
    private cropExists = false;
    // stores value whether a farm already exists
    private farmExists = false;
    // stores value whether a plot already exists
    private plotExists = false;
    farmId = 0;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        carouselConfig: NgbCarouselConfig,
        private _apiService: ApiService,
        private _portfolioService: PortfolioService,
        private _cropService: CropService,
        private _plotService: PlotService,
        private _farmService: FarmService
    ) {
        // prevents the carousel from wrapping
        carouselConfig.wrap = false;
        // hides dealt indicators and navigators
        carouselConfig.showNavigationArrows = false;
        carouselConfig.showNavigationIndicators = false;
    }

    ngOnInit() {
        this.farmForm = this.fb.group({
            address: ['', Validators.required],
            farmName: ['', Validators.required],
            farmAddress: ['', Validators.required],
            yearsActive: ['', Validators.required],
            numberOfEmployees: ['', Validators.required],
            farmingReason: ['', Validators.required],
        });

        this.cropForm = this.fb.group({
            name: ['', Validators.required],
            season: ['', Validators.required],
            price: ['', Validators.required],
            type: ['', Validators.required],
        });

        this.plotForm = this.fb.group({
            plotAddress: ['', Validators.required],
            plotSize: ['', Validators.required],
            dateOfOwnership: ['', Validators.required],
        });
        this.carousel.pause();
        // does check to see if farm exists and fills in form data
        this.populateFarmForm();

        // does check to see if crop exists and fills in form data
        this.populateCropForm();
        // does check to see if the plot exists and fills in form data
        this.populatePlotForm();
    }

    // navigates to a specific slide
    goToSlide(slideId: string) {
        this.carousel.select(slideId);
        this.activeSlideName = this.carousel.activeId;
    }

    // navigates to the next slide
    goToNextSlide() {
        // this.submitted = true;

        // set the portfolio info for a logged in farmer
        this._portfolioService.setFarmerPortfolio();
        // sets the farmers farm
        this._portfolioService.setFarmerFarm();

        // intro slide can just go to next slide on button click
        if (this.carousel.activeId === 'introSlide') {
            this.carousel.next();
        }

        // plot slide routes to dashboard on next -> is the last slide
        if (this.carousel.activeId === 'plotSlide') {
            this.goToDashboard();
        }

        if (this.carousel.activeId === 'farmSlide') {
            this._portfolioService.getFarmerFarm().subscribe(farm => {
                // checks if a user has already added a farm
                if (farm.length != 0) {
                    this.farmExists = true;
                }
            });

            // checks if the farm info is empty
            if (!this.farmExists) {
                // calls method to create farmer farm
                this.createFarmInfo();
            } else {
                this.carousel.next();
            }
        }

        if (this.carousel.activeId === 'cropSlide') {
            this._portfolioService.getFarmerCropInfo().subscribe(crop => {
                // checks if a user has already added a crop
                if (crop.length != 0) {
                    this.cropExists = true;
                    // assigns the crop variable to the first instance of crop fetched
                    this.crop = crop[0];
                }
            });

            // checks if the crop info is empty
            if (!this.cropExists) {
                // calls method to create farmer farm
                this.createCropInfo();
            } else {
                // if the crop already exists it will go to the next slide
                this.carousel.next();
            }
        }

        if (this.carousel.activeId === 'plotSlide') {
            this._portfolioService.getFarmerPlotInfo().subscribe(plot => {
                // checks if a user has already added a plot
                if (plot.length != 0) {
                    this.plotExists = true;
                }
            });

            // checks if the crop info is empty
            if (!this.plotExists) {
                // calls method to create farmer farm
                this.createPlotInfo();
            }
        }

        // sets the current slides name to the variable
        this.activeSlideName = this.carousel.activeId;
    }

    // navigates to the previous slide
    goToPreviousSlide() {
        this.carousel.prev();
        this.activeSlideName = this.carousel.activeId;
    }

    // check if farm info has already been submitted
    createFarmInfo() {
        // checks if the form inputs are valid
        if (this.farmForm.valid) {
            const farmInputValue = this.farmForm.value;
            this.farm = {
                id: this.id,
                farmName: farmInputValue.farmName,
                farmAddress: farmInputValue.farmAddress,
                yearsActive: farmInputValue.yearsActive,
                numberOfEmployees: farmInputValue.numberOfEmployees,
                address: farmInputValue.address,
                farmingReason: farmInputValue.farmingReason,
                crops: [],
                plots: [],
                assets: [],
                incomeStatements: [],
            };
            this.farmFormSubmitted = true;
            this.farmForm.disable();
            // creates a farmer's farm within the farm service
            this._farmService.createFarmerFarm(this.farm);
            // routes to next carousel  page after a farmer has been successfully created
            this.carousel.next();
        }
    }

    // check if farm info has already been submitted

    createCropInfo() {
        if (this.cropForm.valid) {
            const cropFormInputValue = this.cropForm.value;
            this.crop = {
                id: this.id,
                name: cropFormInputValue.name,
                season: cropFormInputValue.season,
                price: cropFormInputValue.price,
                type: cropFormInputValue.type,
                farmId: this.farmId,
            };
            this.cropFormSubmitted = true;
            this.cropForm.disable();
            this._cropService.createFarmerCrop(this.crop);
            // routes to next carousel  page after a crop has been successfully created
            this.carousel.next();
        }
    }

    // check if farm info has already been submitted

    createPlotInfo() {
        if (this.plotForm.valid) {
            const plotFormInputValue = this.plotForm.value;
            this.plots = {
                id: this.id,
                plotAddress: plotFormInputValue.plotAddress,
                plotSize: plotFormInputValue.plotSize,
                dateOfOwnership: plotFormInputValue.dateOfOwnership,
            };
            this.plotFormSubmitted = true;
            this.plotForm.disable();
            this._plotService.createFarmerPlot(this.plots);
            // Check if all slides have been filled out
            if (this.carousel.activeId === 'plotSlide') {
                // All slides have been filled out, navigate to the dashboard
                this.router.navigate(['/dashboard']);
            } else {
                // Go to the next slide if not on the plot slide
                this.carousel.next();
            }
        }
    }

    // checks to see if a slide is active
    isActiveSlide(slideId: string) {
        // default value is false
        let isActive = false;
        // returns true or false on whether a slide is active or not
        this.carousel.activeId === slideId ? (isActive = true) : isActive;

        return isActive;
    }

    populateFarmForm() {
        this._portfolioService.getFarmerFarm().subscribe(farm => {
            // checks if a user has already added a farm
            if (farm.length != 0) {
                this.farmExists = true;
                this.farm = farm[0];
                //populates the form data if the crop value already exists
                this.farmForm.patchValue({
                    address: this.farm.address,
                    farmName: this.farm.farmName,
                    farmAddress: this.farm.farmAddress,
                    yearsActive: this.farm.yearsActive,
                    numberOfEmployees: this.farm.numberOfEmployees,
                    farmingReason: this.farm.farmingReason,
                });
            }
        });
    }

    // populates the crop form if the data exists for it
    populateCropForm() {
        this._portfolioService.getFarmerCropInfo().subscribe(crop => {
            // checks if a user has already added a crop

            if (crop.length != 0) {
                this.cropExists = true;
                // assigns the crop variable to the first instance of crop fetched
                this.crop = crop[0];
                //populates the form data if the crop value already exists
                this.cropForm.patchValue({
                    name: this.crop.name,
                    season: this.crop.season,
                    price: this.crop.price,
                    type: this.crop.type,
                });
            }
        });
    }

    // populates the crop form if the data exists for it
    populatePlotForm() {
        this._portfolioService.getFarmerPlotInfo().subscribe(plot => {
            // checks if a user has already added a crop
            if (plot.length != 0) {
                this.cropExists = true;
                // assigns the crop variable to the first instance of crop fetched
                this.plots = plot[0];
                //populates the form data if the crop value already exists
                this.plotForm.patchValue({
                    plotAddress: this.plots.plotAddress,
                    plotSize: this.plots.plotSize,
                    dateOfOwnership: this.plots.dateOfOwnership,
                });
            }
        });
    }

    goToDashboard() {
        this.router.navigate(['/dashboard']);
    }
}

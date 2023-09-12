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
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./about-the-farm.component.css'],
})
export class AboutTheFarmComponent implements OnInit {
    // used to refer to the bootstrap carousel on HTML
    @ViewChild('carousel', { static: true }) private carousel!: NgbCarousel;
    // stores the current active slide number -> default to first slide
    activeSlideId: number = 1;
    // stores the total slides of the carousel
    totalSlides: number = 4;
    // stores the active slide name id default is the first slide
    activeSlideName: string = 'introSlide';
    // sets the first slide as the active slide
    slides: any = ['introSlide', 'farmSlide', 'cropSlide', 'plotSlide'];
    farmForm!: FormGroup;
    cropForm!: FormGroup;
    plotForm!: FormGroup;

    submitted = false;
    farm!: FarmerFarm;
    crops!: FarmerCrop;
    plots!: FarmerPlot;
    asset!: Assets;
    id = 0;
    isLast: any;

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
            type: ['', Validators.required],
            cropSeedPrice: ['', Validators.required],
        });

        this.plotForm = this.fb.group({
            plotAddress: ['', Validators.required],
            plotSize: ['', Validators.required],
            dateOfOwnership: ['', Validators.required],
        });

        this.carousel.pause();
    }

    // navigates to a specific slide
    goToSlide(item: any) {
        this.carousel.select(item);
        console.log(item);
    }

    // navigates to the next slide
    goToNextSlide() {
        this.submitted = true;
        // stores value whether a farm already exists
        let farmExists = false;
        // stores value whether a crop already exists
        let cropExists = false;
        // stores value whether a plot already exists
        let plotExists = false;

        // set the portfolio info for a logged in farmer
        this._portfolioService.setFarmerPortfolio();

        // intro slide can just go to next slide on button click
        if (this.carousel.activeId === 'introSlide') {
            this.carousel.next();
        }

        if (this.carousel.activeId === 'farmSlide') {
            this._portfolioService.getFarmerFarm().subscribe(farm => {
                // checks if a user has already added a farm
                if (farm.length != 0) {
                    farmExists = true;
                }
            });

            // checks if the farm info is empty
            if (!farmExists) {
                // calls method to create farmer farm
                this.createFarmInfo();
            } else {
                console.log(`Farm already exists`);
                this.carousel.next();
            }
        }

        if (this.carousel.activeId === 'cropSlide') {
            this._portfolioService.getFarmerCropInfo().subscribe(crop => {
                // checks if a user has already added a crop
                if (crop.length != 0) {
                    cropExists = true;
                }
            });

            // checks if the crop info is empty
            if (!cropExists) {
                // calls method to create farmer farm
                this.createCropInfo();
            } else {
                console.log(`Crop already exists`);
                // if the crop already exists it will go to the next slide
                this.carousel.next();
            }
        }

        if (this.carousel.activeId === 'plotSlide') {
            this._portfolioService.getFarmerPlotInfo().subscribe(plot => {
                // checks if a user has already added a plot
                if (plot.length != 0) {
                    plotExists = true;
                }
                console.log(`Plot has been submitted`);
            });

            // checks if the crop info is empty
            if (!plotExists) {
                // calls method to create farmer farm
                this.createPlotInfo();
            } else {
                console.log(`Plot already exists`);
                // if the crop already exists it will go to the next slide
                this.carousel.next();
            }
        }

        // sets the current slides name to the variable
        this.activeSlideName = this.carousel.activeId;
        console.log('Active slide name:' + this.activeSlideName);
    }

    // navigates to the previous slide
    goToPreviousSlide() {
        this.carousel.prev();
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
            // creates a farmer's farm within the farm service
            this._farmService.createFarmerFarm(this.farm);
            // routes to next carousel  page after a farmer has been successfully created
            this.carousel.next();
        } else {
            console.log('Farm form is not valid');
        }
    }

    // check if farm info has already been submitted
    createCropInfo() {
        if (this.cropForm.valid) {
            console.log('I am running');
            const cropFromInputValue = this.cropForm.value;
            this.crops = {
                id: this.id,
                name: cropFromInputValue.name,
                season: cropFromInputValue.season,
                price: cropFromInputValue.cropSeedPrice,
                type: cropFromInputValue.type,
            };
            console.table(this.crops);
            this._cropService.createFarmerCrop(this.crops);
            // routes to next carousel  page after a crop has been successfully created
            this.carousel.next();
        } else {
            console.log('Crop form is not valid');
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
                   dateOfOwnership: plotFormInputValue.date,
               };
               console.table(this.plots);
               this._plotService.createFarmerPlot(this.plots);
               // Check if all slides have been filled out
               if (this.carousel.activeId === 'plotSlide') {
                   // All slides have been filled out, navigate to the dashboard
                   this.router.navigate(['/dashboard']);
               } else {
                   // Go to the next slide if not on the plot slide
                   this.carousel.next();
               }
           } else {
               console.log('Plot form is not valid');
           }
    }
    
}

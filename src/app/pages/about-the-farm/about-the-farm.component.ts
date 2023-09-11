
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
        // set the portfolio info for a logged in farmer
        this._portfolioService.setFarmerPortfolio();

        // intro slide can just go to next slide on button click
        if (this.carousel.activeId === 'introSlide') {
            this.carousel.next();
        }

        if (this.carousel.activeId === 'farmSlide') {
            this.submitted = true;
            this.createFarmInfo();
        }

        // if (this.activeSlideId === 3) {
        //     // console.log(this.cropForm);
        //     if (this.cropForm.valid) {
        //         console.log('I am running');
        //         const formInputValue = this.cropForm.value;
        //         this.crops = {
        //             id: this.id,
        //             name: formInputValue.name,
        //             season: formInputValue.season,
        //             price: 0,
        //             type: formInputValue.type,
        //         };
        //         // this._cropService.createFarmerCrop(this.crop);
        //         console.table(this.crops);

        //         this.checkCropInfo();

        //         if (this.activeSlideId === this.totalSlides) {
        //             // All slides have been filled out, navigate to the dashboard
        //             this.router.navigate(['/dashboard']); // Replace '/dashboard' with your actual dashboard route
        //         } else {
        //             this.carousel.next(); // Move to the next slide
        //         }
        //     } else {
        //         console.log('Crop form is not valid');
        //     }
        // }

        // if (this.activeSlideId === 4) {
        //     if (this.plotForm.valid) {
        //         const formInputValue = this.plotForm.value;
        //         this.plots = {
        //             id: this.id,
        //             plotAddress: formInputValue.plotAddress,
        //             plotSize: formInputValue.plotSize,
        //             dateOfOwnership: formInputValue.date,
        //         };
        //         console.log(this.plots);
        //         this.checkPlotInfo();
        //         // this._plotService.createFarmerPlot(this.plot);
        //         if (this.activeSlideId === this.totalSlides) {
        //             // All slides have been filled out, navigate to the dashboard
        //             this.router.navigate(['/dashboard']); // Replace '/dashboard' with your actual dashboard route
        //         } else {
        //             this.carousel.next(); // Move to the next slide
        //         }
        //     } else {
        //         console.log('Plot form is not valid');
        //     }
        // }
    }

    // navigates to the previous slide
    goToPreviousSlide() {
        if (this.activeSlideId != 1) {
            // decrements the active slide
            this.activeSlideId--;
            console.log(`Current slide: ${this.activeSlideId}`);
        }

        this.carousel.prev();
    }

    // check if farm info has already been submitted
    createFarmInfo() {
        



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
                console.log(this.farm);

                this.createFarmInfo();
                //   this._farmService.createFarmerFarm(this.farm);
                if (this.activeSlideId === this.totalSlides) {
                    // All slides have been filled out, navigate to the dashboard
                    this.router.navigate(['/dashboard']); // Replace '/dashboard' with your actual dashboard route
                } else {
                    this.carousel.next(); // Move to the next slide
                }
            } else {
                console.log('Farm form is not valid');
            }

        this._portfolioService.getFarmerFarm().subscribe(farm => {
            console.table(farm);
            // checks if the farm info is not empty
            if (farm.length === 0) {
                this._farmService.createFarmerFarm(this.farm);
                console.log(`Farm has been submitted`);
            } else {
                console.log(`Farm already exists`);
            }
        });
    }

    // check if farm info has already been submitted
    checkCropInfo() {
        // set the portfolio info for a logged in farmer
        this._portfolioService.setFarmerPortfolio();

        this._portfolioService.getFarmerCropInfo().subscribe(crops => {
            // console.table(crop);
            // checks if the crop info is not empty
            if (crops.length === 0) {
                this._cropService.createFarmerCrop(this.crops);
                console.log(`Crop has been submitted`);
            }
        });
    }

    // check if farm info has already been submitted
    checkPlotInfo() {
        // set the portfolio info for a logged in farmer
        this._portfolioService.setFarmerPortfolio();

        this._portfolioService.getFarmerPlotInfo().subscribe(plots => {
            console.table(plots);
            // checks if the plot info is not empty
            if (plots.length === 0) {
                this._plotService.createFarmerPlot(this.plots);
                console.log(`Plot has been submitted`);
            }
        });
    }
}

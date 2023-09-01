import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Asset } from 'src/app/_models/asset';
import { Crop } from 'src/app/_models/crop';
import { Plot } from 'src/app/_models/plot';
import { Farm } from 'src/app/_models/Farm';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { CropService } from 'src/app/_services/crop-service/crop.service';
import { FarmService } from 'src/app/_services/farm-service/farm.service';
import { AssetService } from 'src/app/_services/asset-service/asset.service';
import { PlotService } from 'src/app/_services/plot-service/plot.service';

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
    totalSlides: number = 6;
    // sets the first slide as the active slide
    slides: any = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'];

    cropForm!: FormGroup;
    plotForm!: FormGroup;
    farmForm!: FormGroup;
    equipmentForm!: FormGroup;
    submitted = false;
    crop!: Crop;
    plot!: Plot;
    farm!: Farm;
    asset!: Asset;
    id = 0;
    isLast: any;
    assetForm!: FormGroup;



    constructor(
        private fb: FormBuilder,
        private router: Router,
        carouselConfig: NgbCarouselConfig,
        private _apiService: ApiService,
        private _portfolioService: PortfolioService,
        private _cropService: CropService,
        private _plotService: PlotService,
        private _farmService: FarmService,
        private _assetService: AssetService
    ) {
        // prevents the carousel from wrapping
        carouselConfig.wrap = false;
        // hides dealt indicators and navigators
        carouselConfig.showNavigationArrows = false;
        carouselConfig.showNavigationIndicators = false;
    }

    ngOnInit() {
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
        this.farmForm = this.fb.group({
            address: ['', Validators.required],
            farmName: ['', Validators.required],
            farmAddress: ['', Validators.required],
            yearsActive: ['', Validators.required],
            numberOfEmployees: ['', Validators.required],
            farmingReason: ['', Validators.required],
        });
        this.assetForm = this.fb.group({
            assetName: ['', Validators.required],
            assetType: ['', Validators.required],
            purchasePrice: ['', Validators.required],
            age: ['', Validators.required],
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

        if (this.activeSlideId != this.totalSlides) {
            // increments the active slide
            this.activeSlideId++;
        }
        // console.log(this.cropForm);
        if (this.cropForm.valid) {
            const formInputValue = this.cropForm.value;
            this.crop = {
                id: 0,
                name: formInputValue.name,
                season: formInputValue.season,
                type: formInputValue.type,

            };
            console.log(this.crop);

            this._cropService.createFarmerCrop(this.crop);
        }
        if (this.farmForm.valid) {
            const farmInputValue = this.farmForm.value;
            this.farm = {
                farmName: farmInputValue.farmName,
                farmAddress: farmInputValue.farmAddress,
                yearsActive: farmInputValue.yearsActive,
                numberOfEmployees: farmInputValue.numberOfEmployees,
                address: farmInputValue.address,
                farmingReason: farmInputValue.farmingReason,
            };
            console.log(this.farm);

            this._farmService.createFarmerFarm(this.farm);
        }
        if (this.plotForm.valid) {
            const formInputValue = this.plotForm.value;
            this.plot = {
                id: 0,
                plotAddress: formInputValue.plotAddress,
                plotSize: formInputValue.plotSize,
                dateOfOwnership: formInputValue.date,
            };
            console.log(this.plot);
            this._plotService.createFarmerPlot(this.plot);
        }
        // console.log(this.farmForm,this.farmName);
        
        if (this.assetForm.valid) {
            const formInputValue = this.assetForm.value;
            this.asset = {
                id: 0,
                assetName: formInputValue.assetName,
                assetType: formInputValue.assetType,
                purchasePrice: formInputValue.purchasePrice,
                age: formInputValue.age,
                // proofOfOwnership: formInputValue.proofOfOfOwnership,
            };
              console.log(this.asset);
            this._assetService.createFarmerAsset(this.asset);
        }
        if (this.activeSlideId === this.totalSlides) {
            // All slides have been filled out, navigate to the dashboard
            this.router.navigate(['/dashboard']); // Replace '/dashboard' with your actual dashboard route
        } else {
            this.carousel.next(); // Move to the next slide
        }
    }

    // navigates to the previous slide
    goToPreviousSlide() {
        if (this.activeSlideId != 1) {
            // decrements the active slide
            this.activeSlideId--;
        }
        this.carousel.prev();
    }
    // getAssetFormGroup(index: number): FormGroup {
    //     // Assuming your assets array is available in this component
    //     return this.assetForm;
    // }

    onSubmit() {
        console.log(
            'Farm form => ',
            this.farmForm,
            this.plotForm,
            this.cropForm,
        );
        // console.log(this.cropForm);
    }
}

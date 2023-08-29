
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

@Component({
    selector: 'app-about-the-farm',
    templateUrl: './about-the-farm.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./about-the-farm.component.css'],
})
export class AboutTheFarmComponent implements OnInit {
    equipmentName: any;
    onEditClicked(arg0: number) {
        throw new Error('Method not implemented.');
    }
    isDisabled: any;

    // stores the current active slide number -> default to first slide
    activeSlideId: number = 1;
    // stores the total slides of the carousel
    totalSlides: number = 5;

    onFileSelected($event: Event) {
        throw new Error('Method not implemented.');
    }

    // used to refer to the bootstrap carousel on HTML
    @ViewChild('carousel', { static: true }) private carousel!: NgbCarousel;
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
    assets: Asset[] = [];
    id = 0;
    isLast: any;
    assetForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        carouselConfig: NgbCarouselConfig,
        private _apiService: ApiService,
        private _portfolioService: PortfolioService
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
            date: ['', Validators.required],
        });
        this.farmForm = this.fb.group({
            address: ['', Validators.required],
            farmName: ['', Validators.required],
            farmAddress: ['', Validators.required],
            yearsActive: ['', Validators.required],
            numEmployee: ['', Validators.required],
            fundingReason: ['', Validators.required],
        });
        this.assetForm = this.fb.group({
            equipmentName: ['', Validators.required],
            equipmentType: ['', Validators.required],
            purchase_Amount: ['', Validators.required],
            age: ['', Validators.required],
            recordProof: ['', Validators.required],
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

        if (this.cropForm.valid) {
             const formInputValue = this.cropForm.value;
            this.crop = {
                name: formInputValue.name,
                season: formInputValue.season,
                type: formInputValue.type,
            };

            console.table(this.crop);
             this._portfolioService.createFarmerCropInfo(this.crop);
        
        }
        if (this.plotForm.valid) {
              const formInputValue = this.plotForm.value;
            this.plot = {
                plotAddress: formInputValue.plotAddress,
                plotSize: formInputValue.plotSize,
                dateOfOwnership: formInputValue.date,
            };
            this._portfolioService.createFarmerPlotInfo(this.plot);
            // this._apiService.addPlotInfo(this.plot).subscribe(data => {
            //     console.table(data);
            // });
        }

        if (this.farmForm.valid) {
            const formInputValue = this.farmForm.value;
            this.farm = {
                farmName: formInputValue.farmName,
                farmAddress: formInputValue.farmAddress,
                yearsActive: formInputValue.yearsActive,
                numEmployee: formInputValue.numEmployee,
                address: formInputValue.address,
                fundingReason: formInputValue.fundingReason,
            };

        

            this._portfolioService.createFarmerFarmInfo(this.farm);


            // this._apiService.addFarmInfo(this.farm).subscribe(data => {
            //     console.table(data);
            // });
        }
        this.carousel.next(); // Move to the next slide
    }

    // navigates to the previous slide
    goToPreviousSlide() {
        if (this.activeSlideId != 1) {
            // decrements the active slide
            this.activeSlideId--;
        }
        this.carousel.prev();
    }
    getAssetFormGroup(index: number): FormGroup {
        // Assuming your assets array is available in this component
        return this.assetForm;
    }
}

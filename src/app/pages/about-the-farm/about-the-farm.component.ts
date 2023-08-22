import { YouAndFarm } from './../../models/you-and-farm';
import { Crop } from './../../models/crop';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Plot } from 'src/app/models/plot';
import { AboutTheFarmService } from 'src/app/services/aboutFarm/about-the-farm.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-about-the-farm',
  templateUrl: './about-the-farm.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./about-the-farm.component.css']
})
export class AboutTheFarmComponent implements OnInit {

  // used to refer to the bootstrap carousel on HTML
  @ViewChild('carousel', { static: true }) private carousel!: NgbCarousel;
  // sets the first slide as the active slide
  slides: any = ['slide1', 'slide2', 'slide3', 'slide4'];
  cropForm!:  FormGroup  ;
  plotForm!:  FormGroup  ;
  farmForm!: FormGroup;
  submitted = false;
  crop!: Crop;
  plot!: Plot;
  farm!: YouAndFarm;
  

  constructor(private fb: FormBuilder,private router: Router, carouselConfig: NgbCarouselConfig, private _aboutFarm: AboutTheFarmService, private _apiService: ApiService) {
    // prevents the carousel from wrapping
    carouselConfig.wrap = false;
    // hides dealt indicators and navigators
    carouselConfig.showNavigationArrows = false;
    carouselConfig.showNavigationIndicators = false;
   
  }

  ngOnInit(): void {
    this.cropForm = this.fb.group({
      seasonFarm: ['', Validators.required],
      cropType: ['', Validators.required],
      type: ['', Validators.required],
  })

  this.plotForm = this.fb.group({
    plot_address : ['', Validators.required],
    size: ['', Validators.required],
    date : ['', Validators.required],
})
this.farmForm = this.fb.group({
  farm_name : ['', Validators.required],
  years_active: ['', Validators.required],
  num_employee : ['', Validators.required],
  funding_reason : ['', Validators.required],
})
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

  if (this.cropForm.valid) {
    this.crop = {
      farm_id: this._aboutFarm.generateFarmId(),
      season: this.cropForm.get('seasonFarm')?.value,
      name: this.cropForm.get('cropType')?.value,
      type: this.cropForm.get('type')?.value,
    };
    

    // console.table(this.crop);

    this._apiService.addCropInfo(this.crop).subscribe(data => {
      console.table(data);
    });
  }
  if (this.plotForm.valid) {
    this.plot = {
      farm_id: this._aboutFarm.generateFarm_Id(),
      plot_address: this.plotForm.get('plot_address')?.value,
      size: this.plotForm.get('size')?.value,
       ownership_date: this.plotForm.get('date')?.value,
    };

   

    this._apiService.addPlotInfo(this.plot).subscribe(data => {
      console.table(data);
    });
  }

  if (this.farmForm.valid) {
    this.farm = {
      farm_id: this._aboutFarm.generateFarm_FarmId(),
      farm_name: this.farmForm.get('farm_name')?.value,
      years_active: this.farmForm.get('years_active')?.value,
      num_employee: this.farmForm.get('num_employee')?.value,
      funding_reason: this.farmForm.get('funding_reason')?.value,
    };

   

    this._apiService.addYouandFarm(this.farm).subscribe(data => {
      console.table(data);
    });
  }
  this.carousel.next(); // Move to the next slide


}
// navigates to the previous slide
goToPreviousSlide() {
    this.carousel.prev();
}
 

}

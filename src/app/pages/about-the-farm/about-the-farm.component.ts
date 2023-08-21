import { Crop } from './../../models/crop';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
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
  submitted = false;
  crop!: Crop;

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

    if( this.cropForm.valid){
      this.crop ={
        farm_id: this._aboutFarm.generateFarmId(),
        season: this.cropForm.get('seasonFarm')?.value,
        name: this.cropForm.get('cropType')?.value,
        type: this.cropForm.get('type')?.value,

      };

      console.table(this.crop);

this._apiService.addCropInfo(this.crop).subscribe(data => {
  console.table(data);
});



    }
    this.carousel.next();
}


// navigates to the previous slide
goToPreviousSlide() {
    this.carousel.prev();
}
 
}


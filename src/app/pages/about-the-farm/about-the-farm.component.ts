import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-the-farm',
  templateUrl: './about-the-farm.component.html',
  styleUrls: ['./about-the-farm.component.css']
})
export class AboutTheFarmComponent implements OnInit {
  // used to refer to the bootstrap carousel on HTML
  @ViewChild('carousel', { static: true }) private carousel!: NgbCarousel;
  // sets the first slide as the active slide
  slides: any = ['slide1', 'slide2', 'slide3', 'slide4'];
  formSlides!: { formGroup: FormGroup }[]; // Define formSlides as an array of form group objects

  constructor(private fb: FormBuilder, carouselConfig: NgbCarouselConfig) {
    // prevents the carousel from wrapping
    carouselConfig.wrap = false;
    // hides dealt indicators and navigators
    carouselConfig.showNavigationArrows = false;
    carouselConfig.showNavigationIndicators = false;
   
  }

  ngOnInit(): void {
    this.formSlides= [
      {
        formGroup: this.fb.group({
          // This is the welcome page for tell us about your farm
          // Add your form controls here
        })
      },
      {
        formGroup: this.fb.group({
          age: ['', Validators.required],
          location: ['', Validators.required],
          ID: ['', Validators.required],
          size: ['', Validators.required],
          number: ['', Validators.required],
          funding: ['', Validators.required],
        })
      },
      {
        formGroup: this.fb.group({
          farmLocation: ['', Validators.required],
          farmSize: ['', Validators.required],
          date: ['', Validators.required],
        })
      },
      {
        formGroup: this.fb.group({
          seasonFarm: ['', Validators.required],
          cropType: ['', Validators.required],
          type: ['', Validators.required],
        })
      },
    ];
    this.carousel.pause();
  }
  // navigates to a specific slide
  goToSlide(item: any) {
    this.carousel.select(item);
    console.log(item);
}

// navigates to the next slide
goToNextSlide() {
    this.carousel.next();
}

// navigates to the previous slide
goToPreviousSlide() {
    this.carousel.prev();
}

 
}


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-the-farm',
  templateUrl: './about-the-farm.component.html',
  styleUrls: ['./about-the-farm.component.css']
})
export class AboutTheFarmComponent {
  
  formSlides = [
    {
      formGroup: this.fb.group({
        // This is the welcome page for tell us about your farm
       
      })
    },
    {
      formGroup: this.fb.group({
        age: ['', Validators.required],
        location: ['', Validators.required],
        ID: ['', Validators.required],
        size:['', Validators.required],
        number:['', Validators.required],
        funding:['', Validators.required],
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

  constructor(private fb: FormBuilder) {}
  carousel: any; // You might need to change the type to match the actual type

  // Function to set the carousel reference
  setCarouselReference(carousel: any) {
    this.carousel = carousel;
  }

  // Function to navigate to the previous slide
  prevSlide() {
    if (this.carousel) {
      this.carousel.prev();
    }
  }

  // Function to navigate to the next slide
  nextSlide() {
    if (this.carousel) {
      this.carousel.next();

  }
  }
}


import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Crop } from 'src/app/models/crop';
import { AboutTheFarmService } from 'src/app/services/aboutFarm/about-the-farm.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-about-the-farm',
  templateUrl: './about-the-farm.component.html',
  styleUrls: ['./about-the-farm.component.css']
})
export class AboutTheFarmComponent implements OnInit {
  @ViewChild('carousel', { static: true }) private carousel!: NgbCarousel;
  slides: any = ['slide1', 'slide2', 'slide3', 'slide4'];
  cropForm!: FormGroup;
  submitted = false;
  crop!: Crop;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    carouselConfig: NgbCarouselConfig,
    private _aboutFarm: AboutTheFarmService,
    private _apiService: ApiService
  ) {
    carouselConfig.wrap = false;
    carouselConfig.showNavigationArrows = false;
    carouselConfig.showNavigationIndicators = false;
  }

  ngOnInit(): void {
    this.cropForm = this.fb.group({
      seasonFarm: ['', Validators.required],
      cropType: ['', Validators.required],
      type: ['', Validators.required]
    });
    this.carousel.pause();
  }

  goToSlide(item: any) {
    this.carousel.select(item);
    console.log(item);
  }

  goToNextSlide() {
    this.carousel.next();
  }

  goToPreviousSlide() {
    this.carousel.prev();
  }

  saveCrop() {
    this.submitted = true;

    if (this.cropForm.valid) {
      this.crop = {
        farm_id: this._aboutFarm.generateFarmId(),
        season: this.cropForm.get('seasonFarm')?.value,
        name: this.cropForm.get('cropType')?.value,
        type: this.cropForm.get('type')?.value
      };

      console.table(this.crop);

      this._apiService.addCropInfo(this.crop).subscribe(data => {
        console.table(data);
      });

      this.router.navigate(['portfolio']);
    }
  }
}

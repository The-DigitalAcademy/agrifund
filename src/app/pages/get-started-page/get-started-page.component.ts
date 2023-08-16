/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 
    UPDATED DATE: 16 Aug 2023 

    DESCRIPTION:
        This component controls the carousel component of page

    PARAMETERS:
        
-------------------------------------------------------------------------------------------------*/
import { Component, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-get-started-page',
    templateUrl: './get-started-page.component.html',
    styleUrls: ['./get-started-page.component.css'],
})
export class GetStartedPageComponent implements OnInit {
    // sets the first slide as the active slide
    activeSlide = 0;

    constructor(carouselConfig: NgbCarouselConfig) {}

    ngOnInit() {
        // this.pause = false;
    }

    // navigates to the next slide
    nextSlide() {}

    // navigates to the previous slide
    previousSlide() {}
}

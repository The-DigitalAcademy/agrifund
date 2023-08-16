/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 
    UPDATED DATE: 16 Aug 2023 

    DESCRIPTION:
        This component controls the carousel component of page

        


    PARAMETERS:
    carousel -> used to call the ng-bootstrap carousel html element 
    ViewEncapsulation -> make bootstrap css for the carousel overridable

-------------------------------------------------------------------------------------------------*/
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-get-started-page',
    templateUrl: './get-started-page.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./get-started-page.component.css'],
})
export class GetStartedPageComponent implements OnInit {
    // used to refer to the bootstrap carousel on HTML
    @ViewChild('carousel', { static: true }) private carousel!: NgbCarousel;
    // sets the first slide as the active slide
    slides: any = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6'];

    constructor(carouselConfig: NgbCarouselConfig) {
        // prevents the carousel from wrapping
        carouselConfig.wrap = false;
        // hides dealt indicators and navigators
        carouselConfig.showNavigationArrows = false;
        carouselConfig.showNavigationIndicators = false;
    }

    ngOnInit() {
        // only allows for the slides to move when the buttons are clicked
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

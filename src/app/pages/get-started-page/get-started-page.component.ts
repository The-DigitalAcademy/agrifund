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
    activeSlideName = 'slide1';

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
    goToSlide(slideId: string) {
        this.carousel.select(slideId);
        this.activeSlideName = this.carousel.activeId;
        console.log(
            'Active slide name from select slide:' + this.activeSlideName
        );
    }

    // navigates to the next slide
    goToNextSlide() {
        this.carousel.next();
        // sets the active slide name
        this.activeSlideName = this.carousel.activeId;
    }

    // navigates to the previous slide
    goToPreviousSlide() {
        this.carousel.prev();
        // sets the active slide name
        this.activeSlideName = this.carousel.activeId;
    }
    // checks to see if a slide is active
    isActiveSlide(slideId: string) {
        // default value is false
        let isActive = false;
        // returns true or false on whether a slide is active or not
        this.carousel.activeId === slideId ? (isActive = true) : isActive;

        return isActive;
    }
}

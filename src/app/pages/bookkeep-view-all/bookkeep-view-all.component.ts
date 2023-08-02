import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-bookkeep-view-all',
    templateUrl: './bookkeep-view-all.component.html',
    styleUrls: ['./bookkeep-view-all.component.css'],
})
export class BookkeepViewAllComponent{
    @ViewChild('content',{static:false}) el!: ElementRef

    title = 'angularpdfgenerator';
makePdf() {
    let pdf = new jsPDF()
    pdf.html(this.el.nativeElement, {
        callback: (pdf) => {
          // save this pdf doc
  
          pdf.save("sample.pdf")
        //   </style></head><body><p>hi there</p></body></html>";
        // var pageWidth = 500;
        // var pageHeight = 295;
        }
    })
}

    constructor( private router: Router){}
  
    counter(i: number) {
        return new Array(i);
    }

    viewRecordDetails(){
        this.router.navigate(['bookkeep/view-record']);
    }
}


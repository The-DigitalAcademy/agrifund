// import { Component, ElementRef, ViewChild } from '@angular/core';
// import jsPDF from 'jspdf';

// @Component({
//   selector: 'app-topdf',
//   templateUrl: './bookkeep-view-all.component.html',
//   styleUrls: ['./topdf.component.css']
// })
// export class TopdfComponent {

//   @ViewChild('content',{static:false}) el!: ElementRef

//   title = 'angularpdfgenerator';

//   makePdf() {
//     let pdf = new jsPDF()
//     pdf.html(this.el.nativeElement, {
//       callback: (pdf) => {
//         // save this pdf doc

//         pdf.save("sample.pdf")
//       }
//     })
//   }
// }

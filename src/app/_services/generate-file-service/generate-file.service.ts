/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 13 Sept 2023
    UPDATED DATE:

    DESCRIPTION:
     Service for generating files for components

    PARAMETERS:


-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root',
})
export class GenerateFileService {
    constructor() {}

    // generates report for bookkeeping records
    generatePdfReport(recordData: IncomeStatementItem[], year: string) {
        console.log(year);
        // sets the content of the pdf to be generated
        const documentDefinition = {
            header:
                'Bookkeeping Report for the financial year of March ' + year,
            content: 'This is where the table will go',
        };
        // pdf file will then be generated
        pdfMake.createPdf(documentDefinition).open();
    }
}

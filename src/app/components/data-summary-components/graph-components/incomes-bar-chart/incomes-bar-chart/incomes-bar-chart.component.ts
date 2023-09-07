/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 07 Sept 2023 
    UPDATED DATE: 

    DESCRIPTION:
        This component is responsible for the creation and generation of a bar chart that summarizes
        the highest incomes for a farmer for the year selected on dashboard
    PARAMETERS:
        _incomeStatementService: IncomeStatementService -> used to access income statement service methods
        
-------------------------------------------------------------------------------------------------*/

import { Component } from '@angular/core';

@Component({
    selector: 'app-incomes-bar-chart',
    templateUrl: './incomes-bar-chart.component.html',
    styleUrls: ['./incomes-bar-chart.component.css'],
})
export class IncomesBarChartComponent {}

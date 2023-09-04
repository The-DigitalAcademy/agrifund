import { Crop } from 'src/app/_models/crop';
import { Plot } from 'src/app/_models/plot';


/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 01 Sept 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for storing the data for a Farmer's farm data
-------------------------------------------------------------------------------------------------*/

import { IncomeStatement } from './IncomeStatement';
import { Assets } from './Assets';





export interface Farm {
    id: number;
    numberOfEmployees: number;
    farmName: string;
    farmAddress: string;
    yearsActive: number;
    address: string; //stores residential address
    farmingReason: string; //stores the reason for needing funding
    crops: Crop[];
    plots: Plot[];
    assets: Assets[];
    incomeStatements: IncomeStatement[];
}

/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 01 Sept 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for storing the data for a Farmer's farm data
-------------------------------------------------------------------------------------------------*/

import { IncomeStatement } from './IncomeStatement';
import { Assets } from './assets';
import { Crop } from './crop';

export interface Farm {
    id: number;
    numberOfEmployees: number;
    farmName: string;
    farmAddress: string;
    yearsActive: number;
    address: string; //stores residential address
    farmingReason: string; //stores the reason for needing funding
    crops: Crop[];
    assets: Assets[];
    incomeStatements: IncomeStatement[];
}

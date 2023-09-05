/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 01 Sept 2023
    UPDATED DATE: 05 Sept 2023

    DESCRIPTION:
    Model for storing the data for a Farmer's farm data
-------------------------------------------------------------------------------------------------*/

import { Assets } from './Assets';
import { IncomeStatement } from './IncomeStatement';
import { Crop } from './crop';
import { Plot } from './plot';

export interface FarmerFarm {
    id: number;
    numberOfEmployees: number;
    farmName: string;
    farmAddress: string;
    yearsActive: number;
    address: string; //stores residential address
    farmingReason: string; //stores the reason for needing funding
    crops: Crop[];
    assets: Assets[];
    plots: Plot[];
    incomeStatements: IncomeStatement[];
}

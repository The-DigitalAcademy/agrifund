/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 30 Aug 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for storing the data received from the portfolio api connection
-------------------------------------------------------------------------------------------------*/
import { IncomeStatement } from './IncomeStatement';

export interface FarmerPortfolio {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cellNumber: string;
    farms: Farms[];
}

export interface Farms {
    id: string;
    numberOfEmployees: number;
    farmName: string;
    farmAddress: string;
    yearsActive: number;
    address: string; //stores residential address
    farmingReason: string; //stores the reason for needing funding
    crops: Crops[];
    assets: Assets[];
    incomeStatements: IncomeStatement[];
}

export interface Crops {
    name: string;
    season: string;
    // price: string;
    // marketValue: string;
    type: string; //stores the type of crop (vegetable/ fruit)
}

export interface Assets {
    assetName: string;
    assetType: string;
    age: number;
    purchasePrice: number;
    // assetValue: number; //stores the value of the asset
}

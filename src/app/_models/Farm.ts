import { Crops } from './FarmerPortfolio';
import { IncomeStatement } from './IncomeStatement';
import { Assets } from './assets';

export interface Farm {
    id: number;
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

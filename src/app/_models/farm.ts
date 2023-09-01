import { Assets, Crops } from './FarmerPortfolio';
import { IncomeStatement } from './IncomeStatement';
export interface FarmData {
    id: number;
    numberOfEmployees: number;
    farmName: string;
    farmAddress: string;
    yearsActive: number;
    address: string; //stores residential address
    farmingReason: string; //stores the reason for needing funding
    
}

/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 30 Aug 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for storing the data received from the portfolio api connection
-------------------------------------------------------------------------------------------------*/
import { Farm } from './farm';

export interface FarmerPortfolio {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cellNumber: string;
    farms: Farm[];
}

export interface Crops {
    id: number;
    name: string;
    season: string;
    // price: string;
    // marketValue: string;
    type: string; //stores the type of crop (vegetable/ fruit)
}

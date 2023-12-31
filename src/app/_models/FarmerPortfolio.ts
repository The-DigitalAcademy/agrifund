/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 30 Aug 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for storing the data received from the portfolio api connection
-------------------------------------------------------------------------------------------------*/

import { FarmerFarm } from './farmerFarm';

export interface FarmerPortfolio {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cellNumber: string;
    farms: FarmerFarm[];
}

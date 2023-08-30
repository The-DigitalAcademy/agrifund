import { Farm } from './farm';

export interface FarmerPortfolio {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cellNumber: string;
    farms: Farm[];
}

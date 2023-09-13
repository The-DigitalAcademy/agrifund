/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 01 Sept 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for storing the data for a Farmer's crop data
-------------------------------------------------------------------------------------------------*/

export interface FarmerCrop {
    id: number;
    name: string;
    season: string;
    price: number;
    // marketValue: number;
    type: string; //stores the type of crop (vegetable/ fruit)
    farmId: number;
}

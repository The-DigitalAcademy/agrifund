/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 01 Sept 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for storing the data for a Farmer's crop data
-------------------------------------------------------------------------------------------------*/

export interface Crop {
    id: number;
    name: string;
    season: string;
    // price: string;
    // marketValue: string;
    type: string; //stores the type of crop (vegetable/ fruit)
}

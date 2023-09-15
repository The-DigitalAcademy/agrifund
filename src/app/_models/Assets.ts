/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 01 Sept 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for storing the data for a Farmer's asset data
-------------------------------------------------------------------------------------------------*/

export interface Assets {
    id: number;
    assetName: string;
    assetType: string;
    age: number;
    purchasePrice: number;
   
}

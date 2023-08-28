import { IncomeStatementItem } from '../IncomeStatementItem';

/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 22 Aug 2023
    UPDATED DATE: 

    DESCRIPTION:
        used to store the current data of the current bookkeeping data on display

-------------------------------------------------------------------------------------------------*/
export interface BookkeepingLoadData {
    metadata: PaginationMetadata; //stores the pagination metadata
    data: IncomeStatementItem[]; //stores the bookkeeping data for a specific page
}

// stores the state of the pagination data
export interface PaginationMetadata {
    itemsPerPage: number; //stores the total number of items per page
    page: number; //stores the current page number
    totalItems: number; //stores the total number of records
}

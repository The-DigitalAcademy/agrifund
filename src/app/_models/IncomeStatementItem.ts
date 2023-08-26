/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 22 Aug 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for individual bookkeeping record income statement items.
-------------------------------------------------------------------------------------------------*/

export interface IncomeStatementItem {
    id: number;
    statement_id: number; //IncomeStatement;
    category: string;
    amount: number;
    proof: string;
    description: string;
    date: string; //date of the record
}

/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 22 Aug 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for individual bookkeeping record income statement items.
-------------------------------------------------------------------------------------------------*/

export interface IncomeStatementItem {
    id: number;
    statementId: number;
    date: string; //date of the record
    category: string;
    amount: number;
    description: string;
    proofOfReceipt: string;
}

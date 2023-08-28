/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 22 Aug 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for bookkeeping record income statements

-------------------------------------------------------------------------------------------------*/

export interface IncomeStatement {
    farm_id: number;
    statement_date: string;
    total_income: number;
    total_expenses: number;
    net_income: number;
}

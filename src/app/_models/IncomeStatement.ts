/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 22 Aug 2023
    UPDATED DATE: 

    DESCRIPTION:
    Model for bookkeeping record income statements

-------------------------------------------------------------------------------------------------*/
import { IncomeStatementItem } from './IncomeStatementItem';

export interface IncomeStatement {
    id: number;
    farmId: number;
    statementDate: string;
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    incomeStatementItems: IncomeStatementItem[];
}

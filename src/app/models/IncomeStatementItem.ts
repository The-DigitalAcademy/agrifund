// import { IncomeStatement } from './income-statement';

export interface IncomeStatementItem {
    id: number;
    statement_id: number; //IncomeStatement;
    category: string;
    amount: number;
    proof: string;
    description: string;
    date: string; //date of the record
}

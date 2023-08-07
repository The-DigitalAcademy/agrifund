// import { IncomeStatement } from './income-statement';

export interface IncomeStatementItem {
    id: number;
    statement_id: number; //IncomeStatementItem;
    category: string;
    amount: number;
    proof: string;
    description: string;
}

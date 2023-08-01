import { IncomeStatement } from './income-statement';

export interface IncomeStatementItem {
    id: number;
    incomeStament: IncomeStatement;
    category: string;
    amount: number;
    proof: string;
    description: string;
}

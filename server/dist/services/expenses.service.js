"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expense_model_1 = require("../models/Expense.model");
class ExpensesService {
    async getExpenses() {
        const expenses = await Expense_model_1.Expense.findAll();
        return expenses;
    }
    async getExpensesByProjectId(projectId) {
        const expenses = await Expense_model_1.Expense.findAll({ where: { projectId } });
        return expenses;
    }
    async createExpense(body) {
        try {
            //Update the client's balance
            const expense = new Expense_model_1.Expense(body);
            await expense.save();
            return expense;
        }
        catch (e) {
            return { error: 'Must have a valid project id' };
        }
    }
}
exports.ExpensesService = ExpensesService;
//# sourceMappingURL=expenses.service.js.map
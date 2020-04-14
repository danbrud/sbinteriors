"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expense_model_1 = require("../models/Expense.model");
class ExpensesService {
    async getExpenses() {
        const expenses = await Expense_model_1.Expense.findAll();
        return expenses;
    }
    async getExpensesByClientId(clientId) {
        const expenses = await Expense_model_1.Expense.findAll({ where: { clientId } });
        return expenses;
    }
    async createExpense(body) {
        //Update the client's balance
        //Possibly update the task current balance or isPaid
        const expense = new Expense_model_1.Expense(body);
        await expense.save();
        return expense;
    }
}
exports.ExpensesService = ExpensesService;
//# sourceMappingURL=expenses.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expense_model_1 = require("../models/Expense.model");
class ExpensesService {
    async getExpenses() {
        const expenses = await Expense_model_1.Expense.findAll();
        return expenses;
    }
    async getExpensesByClientId(clientId, attributes) {
        const options = attributes
            ? { where: { clientId }, attributes }
            : { where: { clientId } };
        const expenses = await Expense_model_1.Expense.findAll(options);
        return expenses;
    }
    async createExpense(body) {
        const expense = new Expense_model_1.Expense(body);
        await expense.save();
        return expense;
    }
}
exports.ExpensesService = ExpensesService;
//# sourceMappingURL=expenses.service.js.map
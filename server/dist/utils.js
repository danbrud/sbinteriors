"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transfer_model_1 = require("./models/Transfer.model");
const Expense_model_1 = require("./models/Expense.model");
const Task_model_1 = require("./models/Task.model");
const BalanceTransfer_model_1 = require("./models/BalanceTransfer.model");
exports.getTotal = function (data) {
    let prop;
    if (!data[0]) {
        return 0;
    }
    else if (data[0] instanceof Transfer_model_1.Transfer) {
        prop = 'ilsAmount';
    }
    else if (data[0] instanceof Task_model_1.Task) {
        prop = 'price';
    }
    else if (data[0] instanceof Expense_model_1.Expense || data[0] instanceof BalanceTransfer_model_1.BalanceTransfer) {
        prop = 'amount';
    }
    const total = data.reduce((acc, item) => acc + item[prop], 0);
    return total;
};
//# sourceMappingURL=utils.js.map
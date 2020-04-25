"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_model_1 = require("../models/Client.model");
const Transfer_model_1 = require("../models/Transfer.model");
const Task_model_1 = require("../models/Task.model");
const Expense_model_1 = require("../models/Expense.model");
const sequelize_1 = require("sequelize");
const Contract_model_1 = require("../models/Contract.model");
class ClientsService {
    async getClients() {
        const clients = await Client_model_1.Client.findAll();
        return clients;
    }
    async createClient(body) {
        const client = new Client_model_1.Client(body);
        await client.save();
        return client;
    }
    async updateClient(clientId, body) {
        const { prop, value } = body;
        const client = await Client_model_1.Client.findOne({ where: { id: clientId } });
        client[prop] = value;
        client.save();
        return client;
    }
    async getExpenseBalance(clientId) {
        const transfers = await this.getTransfersByAccount(clientId, 'expenses', ['ilsAmount']);
        const expenses = await Expense_model_1.Expense.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { clientId: parseInt(clientId) }
                ]
            },
            attributes: ['amount']
        });
        const expenseSum = expenses.reduce((acc, e) => acc + e.amount, 0);
        const transferSum = transfers.reduce((acc, t) => acc + t.ilsAmount, 0);
        const balance = transferSum - expenseSum;
        return { balance };
    }
    async getTaskBalance(clientId) {
        const transfers = await this.getTransfersByAccount(clientId, 'tasks', ['ilsAmount']);
        const tasks = await Task_model_1.Task.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { clientId: parseInt(clientId) }
                ]
            },
            attributes: ['price']
        });
        const taskSum = tasks.reduce((acc, t) => acc + t.price, 0);
        const transferSum = transfers.reduce((acc, t) => acc + t.ilsAmount, 0);
        const balance = transferSum - taskSum;
        return { balance };
    }
    async getTransfersByAccount(clientId, account, attributes) {
        return await Transfer_model_1.Transfer.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { clientId: parseInt(clientId) },
                    { account }
                ]
            },
            attributes
        });
    }
    async addContract(clientId, body) {
        const contract = [];
        for (let key in body) {
            const contractItem = new Contract_model_1.Contract({
                clientId: parseInt(clientId),
                serviceId: parseInt(key),
                includedHours: body[key]
            });
            await contractItem.save();
            contract.push(contractItem);
        }
        return contract;
    }
    async getContract(clientId) {
        const contract = Contract_model_1.Contract.findAll({
            where: {
                clientId: parseInt(clientId)
            }
        });
        return contract;
    }
}
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
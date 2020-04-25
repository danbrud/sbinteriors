"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_model_1 = require("../models/Client.model");
const Contract_model_1 = require("../models/Contract.model");
const expenses_service_1 = require("./expenses.service");
const tasks_service_1 = require("./tasks.service");
const transfers_service_1 = require("./transfers.service");
const utils_1 = require("../utils");
class ClientsService {
    async getClients() {
        const clients = await Client_model_1.Client.findAll();
        return clients;
    }
    async getClientById(id, attributes) {
        const client = await Client_model_1.Client.findOne({ where: { id }, attributes });
        return client;
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
    async getBalanceByAccount(clientId, account) {
        const expensesService = new expenses_service_1.ExpensesService();
        const transfersService = new transfers_service_1.TransfersService();
        const tasksService = new tasks_service_1.TasksService();
        const transfers = await transfersService.getTransfersByClientId(clientId, ['ilsAmount'], [{ account }]);
        let items;
        if (account === 'expenses') {
            items = await expensesService.getExpensesByClientId(clientId, ['amount']);
        }
        else {
            items = await tasksService.getTasksByClientId(clientId, null, ['price']);
        }
        const itemTotal = utils_1.getTotal(items);
        const transferTotal = utils_1.getTotal(transfers);
        const balance = transferTotal - itemTotal;
        return { balance };
    }
    async addContract(clientId, body) {
        const contract = [];
        for (let key in body) {
            const contractItem = new Contract_model_1.Contract({
                clientId, serviceId: key, includedHours: body[key]
            });
            await contractItem.save();
            contract.push(contractItem);
        }
        return contract;
    }
    async getContract(clientId) {
        const contract = Contract_model_1.Contract.findAll({ where: { clientId } });
        return contract;
    }
}
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
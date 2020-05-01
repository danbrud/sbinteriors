"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_model_1 = require("../models/Client.model");
const Task_model_1 = require("../models/Task.model");
const Expense_model_1 = require("../models/Expense.model");
const Contract_model_1 = require("../models/Contract.model");
const expenses_service_1 = require("./expenses.service");
const tasks_service_1 = require("./tasks.service");
const transfers_service_1 = require("./transfers.service");
const utils_1 = require("../utils");
const Transfer_model_1 = require("../models/Transfer.model");
const generatePDF_1 = require("../generatePDF");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ClientsService {
    async getClients() {
        const clients = await Client_model_1.Client.findAll();
        return clients;
    }
    async getClientById(id, attributes, include) {
        const client = await Client_model_1.Client.findOne({ where: { id }, attributes, include });
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
        const balanceTransfers = await transfersService.getBalanceTransfersByClientId(clientId);
        let items;
        if (account === 'expenses') {
            items = await expensesService.getExpensesByClientId(clientId, ['amount']);
        }
        else {
            items = await tasksService.getTasksByClientId(clientId, null, ['price']);
        }
        const itemTotal = utils_1.getTotal(items);
        const transferTotal = utils_1.getTotal(transfers);
        const fromTotal = utils_1.getTotal(balanceTransfers.filter(t => t.fromAccount === account));
        const toTotal = utils_1.getTotal(balanceTransfers.filter(t => t.toAccount === account));
        const balance = transferTotal - itemTotal + toTotal - fromTotal;
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
    async generateReport(clientId) {
        const client = await this.getClientById(clientId, null, [Transfer_model_1.Transfer, Task_model_1.Task, Expense_model_1.Expense]);
        this.generatePDF(client);
        return client;
    }
    generatePDF(client) {
        // const options = { format: 'A3', orientation: 'portrait', border: '10mm' }
        const html = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'template.html'), 'utf8');
        const document = {
            html, data: client, path: path_1.default.join(__dirname, '..', '..', 'report.pdf')
        };
        generatePDF_1.create(document)
            .then(res => {
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
}
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
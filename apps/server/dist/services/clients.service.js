"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const Client_model_1 = require("../models/Client.model");
const Task_model_1 = require("../models/Task.model");
const Expense_model_1 = require("../models/Expense.model");
const Contract_model_1 = require("../models/Contract.model");
const expenses_service_1 = require("./expenses.service");
const tasks_service_1 = require("./tasks.service");
const transfers_service_1 = require("./transfers.service");
const utils_1 = require("../utils");
const Transfer_model_1 = require("../models/Transfer.model");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_model_1 = require("../models/User.model");
const uniqid_1 = __importDefault(require("uniqid"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
class ClientsService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_EMAIL_PASSWORD
            }
        });
    }
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
        await this.createUser(client);
        return client;
    }
    async createUser(client, password, isAdmin) {
        //should check if the user exists
        const user = new User_model_1.User({
            username: client.email.split('@')[0],
            password: password ? password : uniqid_1.default(),
            role: isAdmin ? 'ADMIN' : 'USER'
        });
        if (!isAdmin) {
            user.clientId = client.id;
        }
        // this.emailUserDetails(user, email)
        this.emailUserDetails(user, client, process.env.ADMIN_EMAIL);
        this.hashPassword(user, user.password);
    }
    async hashPassword(user, password) {
        bcryptjs_1.default.genSalt(10, (error, salt) => {
            bcryptjs_1.default.hash(password, salt, async (err, hash) => {
                if (err) {
                    throw err;
                }
                user.password = hash;
                await user.save();
            });
        });
    }
    async updatePassword(userId, { password }) {
        const user = await User_model_1.User.findOne({ where: { id: userId } });
        await this.hashPassword(user, password);
        return { success: true };
    }
    emailUserDetails(user, client, email) {
        const template = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'templates', 'email-template.html'), 'utf-8');
        const content = utils_1.generateHtml(template, {
            name: client.name, username: user.username, password: user.password
        });
        const attachments = [{
                filename: 'android-chrome-192x192.png',
                cid: 'sbinteriors-email-logo',
                path: path_1.default.join(__dirname, '..', '..', 'assets', 'android-chrome-192x192.png')
            }];
        const mailOptions = this.createEmailObject(email, `Your login details for the SBInteriors App`, content, true, attachments);
        this.transporter.sendMail(mailOptions);
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
    async updateContract(contractItem) {
        const { clientId, serviceId, includedHours } = contractItem;
        const contract = await Contract_model_1.Contract.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { clientId }, { serviceId }
                ]
            }
        });
        contract.includedHours = includedHours;
        contract.save();
        return contract;
    }
    async getContract(clientId) {
        const contract = Contract_model_1.Contract.findAll({ where: { clientId } });
        return contract;
    }
    async generateReport(clientId) {
        const client = await this.getClientById(clientId, null, [Transfer_model_1.Transfer, Task_model_1.Task, Expense_model_1.Expense]);
        this.generatePDF(client);
        //Should handle errors
        return true;
    }
    async generatePDF(client) {
        // const options = { format: 'A3', orientation: 'portrait', border: '10mm' }
        const html = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'templates', 'report-template.html'), 'utf8');
        const document = {
            html, data: client, path: path_1.default.join(__dirname, '..', '..', 'reports', 'report.pdf')
        };
        await utils_1.createPDF(document);
        await this.sendPDFReport(client);
    }
    async sendPDFReport(client) {
        const mailOptions = this.createEmailObject(process.env.ADMIN_EMAIL, `Report for ${client.name}`, `Please find the attached report for ${client.name}.`, false, [{
                filename: `${client.name}-report.pdf`,
                path: path_1.default.join(__dirname, '..', '..', 'reports', 'report.pdf')
            }]);
        this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
    }
    createEmailObject(to, subject, content, isHTML = false, attachments) {
        const mailOptions = { from: process.env.ADMIN_EMAIL, to, subject };
        if (isHTML) {
            mailOptions.html = content;
        }
        else {
            mailOptions.text = content;
        }
        if (attachments) {
            mailOptions.attachments = attachments;
        }
        return mailOptions;
    }
}
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
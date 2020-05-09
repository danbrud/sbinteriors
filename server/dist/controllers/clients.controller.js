"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clients_service_1 = require("../services/clients.service");
class ClientsController {
    constructor() {
        this.clientsService = new clients_service_1.ClientsService();
        this.path = 'clients';
        this.router = express_1.default.Router();
        this.getClients = async (req, res) => {
            const clients = await this.clientsService.getClients();
            res.send(clients);
        };
        this.createClient = async (req, res) => {
            const client = await this.clientsService.createClient(req.body);
            res.send(client);
        };
        this.getClientById = async (req, res) => {
            const client = await this.clientsService.getClientById(req.params.clientId);
            res.send(client);
        };
        this.updateClient = async (req, res) => {
            const { params, body } = req;
            const client = await this.clientsService.updateClient(params.clientId, body);
            res.send(client);
        };
        this.getBalance = async (req, res) => {
            const { clientId, account } = req.params;
            const balance = await this.clientsService.getBalanceByAccount(clientId, account);
            res.send(balance);
        };
        this.addContract = async (req, res) => {
            const contract = await this.clientsService.addContract(req.params.clientId, req.body);
            res.send({ contract });
        };
        this.getContract = async (req, res) => {
            const contract = await this.clientsService.getContract(req.params.clientId);
            res.send({ contract });
        };
        this.generateReport = async (req, res) => {
            const success = await this.clientsService.generateReport(req.params.clientId);
            res.send({ success });
        };
        this.addAdminUser = async (req, res) => {
            const { email, password } = req.body;
            await this.clientsService.createUser({ email }, password, true);
            res.send({ success: true });
        };
        this.updatePassword = async (req, res) => {
            const response = await this.clientsService.updatePassword(req.params.userId, req.body);
            res.send(response);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/', this.getClients);
        this.router.post('/', this.createClient);
        this.router.get('/:clientId', this.getClientById);
        this.router.put('/:clientId', this.updateClient);
        this.router.get('/:clientId/balance/:account', this.getBalance);
        this.router.post('/:clientId/contracts', this.addContract);
        this.router.post('/user/admin', this.addAdminUser);
        this.router.get('/:clientId/contracts', this.getContract);
        this.router.get('/:clientId/report', this.generateReport);
        this.router.put('/user/:userId/password', this.updatePassword);
    }
}
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map
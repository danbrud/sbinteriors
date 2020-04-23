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
        this.updateClient = async (req, res) => {
            const { params, body } = req;
            const client = await this.clientsService.updateClient(params.clientId, body);
            res.send(client);
        };
        this.getBalance = async (req, res) => {
            const { clientId, type } = req.params;
            const balance = type === 'expenses'
                ? await this.clientsService.getExpenseBalance(clientId)
                : await this.clientsService.getTaskBalance(clientId);
            res.send(balance);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/', this.getClients);
        this.router.post('/', this.createClient);
        this.router.put('/:clientId', this.updateClient);
        this.router.get('/:clientId/balance/:type', this.getBalance);
    }
}
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map
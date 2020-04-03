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
        this.getClients = (req, res) => {
            const response = this.clientsService.getClients();
            res.send(response);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/', this.getClients);
        // this.router.post(this.path, )
    }
}
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map
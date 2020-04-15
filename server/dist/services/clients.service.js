"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_model_1 = require("../models/Client.model");
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
}
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
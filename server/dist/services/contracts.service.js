"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contract_model_1 = require("../models/Contract.model");
class ContractsService {
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
}
exports.ContractsService = ContractsService;
//# sourceMappingURL=contracts.service.js.map
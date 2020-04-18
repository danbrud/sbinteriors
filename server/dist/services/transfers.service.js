"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transfer_model_1 = require("../models/Transfer.model");
const TransferMethod_model_1 = require("../models/TransferMethod.model");
class TransfersService {
    async getTransfers() {
        const transfers = await Transfer_model_1.Transfer.findAll();
        return transfers;
    }
    async getTransfersByClientId(clientId) {
        const transfers = await Transfer_model_1.Transfer.findAll({ where: { clientId }, include: [TransferMethod_model_1.TransferMethod] });
        return transfers;
    }
    async createTransfer(body) {
        const transfer = new Transfer_model_1.Transfer(body);
        await transfer.save();
        return transfer;
    }
}
exports.TransfersService = TransfersService;
//# sourceMappingURL=transfers.service.js.map
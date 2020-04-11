"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transfer_model_1 = require("../models/Transfer.model");
class TransfersService {
    async getTransfers() {
        const transfers = await Transfer_model_1.Transfer.findAll();
        return transfers;
    }
    async getTransfersByClientId(clientId) {
        const transfers = await Transfer_model_1.Transfer.findAll({ where: { clientId } });
        return transfers;
    }
    async createTransfer(body) {
        try {
            //Make sure to update client balance
            const transfer = new Transfer_model_1.Transfer(body);
            await transfer.save();
            return transfer;
        }
        catch (e) {
            return { error: 'Must have a valid client id' };
        }
    }
}
exports.TransfersService = TransfersService;
//# sourceMappingURL=transfers.service.js.map
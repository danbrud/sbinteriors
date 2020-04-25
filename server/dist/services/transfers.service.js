"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transfer_model_1 = require("../models/Transfer.model");
const TransferMethod_model_1 = require("../models/TransferMethod.model");
const sequelize_1 = require("sequelize");
class TransfersService {
    async getTransfers() {
        const transfers = await Transfer_model_1.Transfer.findAll();
        return transfers;
    }
    async getTransfersByClientId(clientId, attributes, where) {
        const options = attributes
            ? { where: {
                    [sequelize_1.Op.and]: [
                        { clientId },
                        ...where
                    ]
                },
                attributes
            }
            : { where: { clientId }, include: [TransferMethod_model_1.TransferMethod] };
        const transfers = await Transfer_model_1.Transfer.findAll(options);
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
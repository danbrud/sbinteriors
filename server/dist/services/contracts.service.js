"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contract_model_1 = require("../models/Contract.model");
const sequelize_1 = require("sequelize");
class ContractsService {
    async getContractByClientId(clientId, where) {
        where = where ? where : [];
        const contract = await Contract_model_1.Contract.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { clientId },
                    ...where
                ]
            }
        });
        return contract;
    }
}
exports.ContractsService = ContractsService;
//# sourceMappingURL=contracts.service.js.map
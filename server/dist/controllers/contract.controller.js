"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contracts_service_1 = require("../services/contracts.service");
class ContractController {
    constructor() {
        this.contractsService = new contracts_service_1.ContractsService();
        this.path = 'contracts';
        this.router = express_1.default.Router();
        this.addContract = async (req, res) => {
            const contract = await this.contractsService.addContract(req.params.clientId, req.body);
            res.send({ contract });
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post('/:clientId', this.addContract);
    }
}
exports.ContractController = ContractController;
//# sourceMappingURL=contract.controller.js.map
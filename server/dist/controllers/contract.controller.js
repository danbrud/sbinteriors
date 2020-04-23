"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contract_service_1 = require("../services/contract.service");
class ContractController {
    constructor() {
        this.contractService = new contract_service_1.ContractService;
        this.path = 'admin';
        this.router = express_1.default.Router();
        this.intializeRoutes();
    }
    intializeRoutes() {
        // this.router.get('/balance/:type', this.getBalance)
    }
}
exports.ContractController = ContractController;
//# sourceMappingURL=contract.controller.js.map
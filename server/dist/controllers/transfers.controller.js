"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transfers_service_1 = require("../services/transfers.service");
class TransfersController {
    constructor() {
        this.transfersService = new transfers_service_1.TransfersService();
        this.path = 'transfers';
        this.router = express_1.default.Router();
        this.getTransfers = async (req, res) => {
            const transfers = await this.transfersService.getTransfers();
            res.send(transfers);
        };
        this.getTransfersByClientId = async (req, res) => {
            const { clientId } = req.params;
            const transfers = await this.transfersService.getTransfersByClientId(clientId);
            res.send(transfers);
        };
        this.createTransfer = async (req, res) => {
            const transfer = await this.transfersService.createTransfer(req.body);
            res.send(transfer);
        };
        this.createBalanceTransfer = async (req, res) => {
            const balanceTransfer = await this.transfersService.createBalanceTransfer(req.body);
            res.send(balanceTransfer);
        };
        this.getBalanceTransfersByClientId = async (req, res) => {
            const { clientId } = req.params;
            const balanceTransfers = await this.transfersService.getBalanceTransfersByClientId(clientId);
            res.send(balanceTransfers);
        };
        this.updateTransfer = async (req, res) => {
            const { transferId } = req.params;
            const transfer = await this.transfersService.updateTransfer(transferId, req.body);
            res.send(transfer);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/', this.getTransfers);
        this.router.get('/:clientId', this.getTransfersByClientId);
        this.router.post('/', this.createTransfer);
        this.router.post('/balances', this.createBalanceTransfer);
        this.router.get('/:clientId/balances', this.getBalanceTransfersByClientId);
        this.router.put('/:transferId', this.updateTransfer);
    }
}
exports.TransfersController = TransfersController;
//# sourceMappingURL=transfers.controller.js.map
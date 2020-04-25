"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_service_1 = require("../services/admin.service");
class AdminController {
    constructor() {
        this.adminService = new admin_service_1.AdminService();
        this.path = 'admin';
        this.router = express_1.default.Router();
        this.getServices = async (req, res) => {
            const services = await this.adminService.getServices();
            res.send(services);
        };
        this.createService = async (req, res) => {
            const service = await this.adminService.createService(req.body);
            res.send(service);
        };
        this.createTransferMethod = async (req, res) => {
            const trasnferMethod = await this.adminService.createTransferMethod(req.body);
            res.send(trasnferMethod);
        };
        this.getTransferMethods = async (req, res) => {
            const transferMethods = await this.adminService.getTransferMethods();
            res.send(transferMethods);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/services', this.getServices);
        this.router.post('/services', this.createService);
        this.router.get('/transfer-methods', this.getTransferMethods);
        this.router.post('/transfer-methods', this.createTransferMethod);
        this.router.get('/transfer-methods', this.getTransferMethods);
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map